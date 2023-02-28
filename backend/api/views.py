from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

import datetime
import requests
import time
import schedule

from .models import *
from .serializers import *

class SignUp(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        confirm_password = request.data.get("confirm_password")

        if password != confirm_password:
            return Response({"error": "Passwords don't match"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=email, email=email, password=password)
        user.save()

        token = Token.objects.create(user=user)
        token.save()

        wallet = UserWalletSerializer.create(UserWalletSerializer(), validated_data={'userID': user})

        btc = FixedAssetsSerializer.create(FixedAssetsSerializer(), validated_data={'FixedAssetCode': 'bitcoin'})
        eth = FixedAssetsSerializer.create(FixedAssetsSerializer(), validated_data={'FixedAssetCode': 'ethereum'})
        tether = FixedAssetsSerializer.create(FixedAssetsSerializer(), validated_data={'FixedAssetCode': 'tether'})
        xrp = FixedAssetsSerializer.create(FixedAssetsSerializer(), validated_data={'FixedAssetCode': 'ripple'})

        UserAssetsBalanceSerializer.create(UserAssetsBalanceSerializer(), validated_data={'walletID': wallet, 'Balance': 100.0})

        sip = SIPSerializer.create(SIPSerializer(), validated_data={'userID': user, 'SIPName': 'Default SIP', 'SIPAmount': 100.0, 'SIPFrequency': 'Monthly', 'SIPStartDate': datetime.date.today(), 'SIPEndDate': datetime.date.today() + datetime.timedelta(days=365), 'SIPStatus': True, 'TotalInvestedAmount': 0.0, 'CurrentInvestedAmount': 0.0})

        SIPAssetsSerializer.create(SIPAssetsSerializer(), validated_data={'SIPID': sip, 'AssetName': btc, 'AssetPercentage': 25.0})
        SIPAssetsSerializer.create(SIPAssetsSerializer(), validated_data={'SIPID': sip, 'AssetName': eth, 'AssetPercentage': 25.0})
        SIPAssetsSerializer.create(SIPAssetsSerializer(), validated_data={'SIPID': sip, 'AssetName': tether, 'AssetPercentage': 25.0})
        SIPAssetsSerializer.create(SIPAssetsSerializer(), validated_data={'SIPID': sip, 'AssetName': xrp, 'AssetPercentage': 25.0})

        return Response({"userID": user.id, "sipID": sip.SIPID, "token": token.key}, status=status.HTTP_201_CREATED)

class SignIn(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(request, username=email, email=email, password=password)

        if user is not None:
            login(request, user)
            token = Token.objects.get(user=user)
            wallet = UserWalletSerializer.getUserWallet(UserWalletSerializer(), userID=user)
            response = Response({"token": token.key, "userID": user.id, "walletID": wallet.walletID}, status=status.HTTP_200_OK)
            return response
        else:
            return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)


class SignOut(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)

class GetUserBalance(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, userID):
        walletBalance = 0
        investedAmount = 0
        currentAssetValue = 0
        user = User.objects.get(id=userID)
        userWallet = UserWalletSerializer.getUserWallet(UserWalletSerializer(), userID=user)
        userWalletBalance = UserAssetsBalance.objects.get(walletID=userWallet)
        walletBalance = userWalletBalance.Balance
        url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Ctether%2Cripple&vs_currencies=usd"
        response = requests.get(url)
        data = response.json()
        sip = SIP.objects.filter(userID=user)
        for s in sip:
            investedAmount = investedAmount + s.SIPAmount
            sipAssets = SIPAssets.objects.filter(SIPID=s)
            for sa in sipAssets:
                assetAmount = (s.SIPAmount * sa.AssetPercentage) / 100
                if sa.AssetName.FixedAssetCode == 'bitcoin':
                    currentAssetValue = currentAssetValue + (assetAmount * data['bitcoin']['usd'])
                elif sa.AssetName.FixedAssetCode == 'ethereum':
                    currentAssetValue = currentAssetValue + (assetAmount * data['ethereum']['usd'])
                elif sa.AssetName.FixedAssetCode == 'tether':
                    currentAssetValue = currentAssetValue + (assetAmount * data['tether']['usd'])
                elif sa.AssetName.FixedAssetCode == 'ripple':
                    currentAssetValue = currentAssetValue + (assetAmount * data['ripple']['usd'])

        return Response({"walletBalance": walletBalance, "investedAmount": investedAmount, "currentAssetValue": currentAssetValue}, status=status.HTTP_200_OK)


class UserSIPWallet(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, _, userID):
        user = User.objects.get(id=userID)
        assetsMap = {}
        for s in SIP.objects.filter(userID=user):
            sipAssets = SIPAssets.objects.filter(SIPID=s)
            for sa in sipAssets:
                assetAmount = (s.SIPAmount * sa.AssetPercentage) / 100
                if sa.AssetName.FixedAssetCode == 'bitcoin':
                    if 'bitcoin' in assetsMap:
                        assetsMap['bitcoin'] = assetsMap['bitcoin'] + assetAmount
                    else:
                        assetsMap['bitcoin'] = assetAmount
                elif sa.AssetName.FixedAssetCode == 'ethereum':
                    if 'ethereum' in assetsMap:
                        assetsMap['ethereum'] = assetsMap['ethereum'] + assetAmount
                    else:
                        assetsMap['ethereum'] = assetAmount
                elif sa.AssetName.FixedAssetCode == 'tether':
                    if 'tether' in assetsMap:
                        assetsMap['tether'] = assetsMap['tether'] + assetAmount
                    else:
                        assetsMap['tether'] = assetAmount
                elif sa.AssetName.FixedAssetCode == 'ripple':
                    if 'ripple' in assetsMap:
                        assetsMap['ripple'] = assetsMap['ripple'] + assetAmount
                    else:
                        assetsMap['ripple'] = assetAmount
        assets = []
        for key, value in assetsMap.items():
            assets.append({"assetName": key, "assetAmount": value})

        return Response({"assets": assets}, status=status.HTTP_200_OK)


class UserSIP(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, _, userID):
        url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Ctether%2Cripple&vs_currencies=usd"
        response = requests.get(url)
        data = response.json()
        user = User.objects.get(id=userID)
        sip = SIP.objects.filter(userID=user)
        for s in sip:
            sipAssets = SIPAssets.objects.filter(SIPID=s)
            for sa in sipAssets:
                assetAmount = (s.SIPAmount * sa.AssetPercentage) / 100
                s.CurrentInvestedAmount = s.CurrentInvestedAmount + assetAmount
                if sa.AssetName.FixedAssetCode == 'bitcoin':
                    s.TotalInvestedAmount = s.TotalInvestedAmount + (assetAmount * data['bitcoin']['usd'])
                elif sa.AssetName.FixedAssetCode == 'ethereum':
                    s.TotalInvestedAmount = s.TotalInvestedAmount + (assetAmount * data['ethereum']['usd'])
                elif sa.AssetName.FixedAssetCode == 'tether':
                    s.TotalInvestedAmount = s.TotalInvestedAmount + (assetAmount * data['tether']['usd'])
                elif sa.AssetName.FixedAssetCode == 'ripple':
                    s.TotalInvestedAmount = s.TotalInvestedAmount + (assetAmount * data['ripple']['usd'])
        serializer = SIPSerializer(sip, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserSIPAssets(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, _, userID, sipID):
        user = User.objects.get(id=userID)
        sip = SIP.objects.get(userID=user, SIPID=sipID)
        sipAssets = SIPAssets.objects.filter(SIPID=sip)
        assets = []
        for sa in sipAssets:
            assetAmount = (sip.SIPAmount * sa.AssetPercentage) / 100
            assets.append({"AssetName": sa.AssetName.FixedAssetCode, "AssetBalance": assetAmount, "AssetPercentage": sa.AssetPercentage})
        return Response(assets, status=status.HTTP_200_OK)

class UserSIPAssets(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, userID, sipID):
        user = User.objects.get(id=userID)
        sip = SIP.objects.get(userID=user, SIPID=sipID)
        sipAssets = SIPAssets.objects.filter(SIPID=sip)
        assets = []
        for sa in sipAssets:
            assetAmount = (sip.SIPAmount * sa.AssetPercentage) / 100
            assets.append({"AssetName": sa.AssetName.FixedAssetCode, "AssetBalance": assetAmount, "AssetPercentage": sa.AssetPercentage})
        return Response(assets, status=status.HTTP_200_OK)

class UserSIPEdit(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, userID, sipID):
        user = User.objects.get(id=userID)
        sip = SIP.objects.get(userID=user, SIPID=sipID)
        sip.SIPAmount = request.data['SIPAmount']
        sip.SIPStatus = request.data['SIPStatus']
        sip.save()
        return Response({"message": "SIP updated successfully"}, status=status.HTTP_200_OK)
class UserSIPAssetsEdit(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, userID, sipID):
        user = User.objects.get(id=userID)
        sip = SIP.objects.get(userID=user, SIPID=sipID)
        sipAssets = SIPAssets.objects.filter(SIPID=sip)
        for sa in sipAssets:
            if sa.AssetName.FixedAssetCode == request.data['AssetName']:
                sa.AssetPercentage = request.data['AssetPercentage']
                sa.AssetStatus = request.data['AssetStatus']
                sa.save()
                return Response({"message": "SIP updated successfully"}, status=status.HTTP_200_OK)
        totalPercentage = 0
        for sa in sipAssets:
            totalPercentage = totalPercentage + sa.AssetPercentage
        if totalPercentage + request.data['AssetPercentage'] > 100:
            return Response({"message": "Total percentage should be 100"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message": "Asset not found"}, status=status.HTTP_400_BAD_REQUEST)

class UserWalletDeposit(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, userID):
        user = User.objects.get(id=userID)
        walletID = UserWalletSerializer.getUserWallet(UserWalletSerializer, userID=user)
        wallet = UserAssetsBalanceSerializer.addUserWalletBalance(UserAssetsBalanceSerializer, walletID=walletID, amount=request.data['Amount'])
        wallet.save()
        return Response({"message": "Wallet updated successfully"}, status=status.HTTP_200_OK)

class UserSIPAdd(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, userID):
        user = User.objects.get(id=userID)
        walletID = UserWalletSerializer.getUserWallet(UserWalletSerializer, userID=user)
        wallet = UserAssetsBalanceSerializer.addUserWalletBalance(UserAssetsBalanceSerializer, walletID=walletID, amount=request.data['SIPAmount'])
        if wallet.Balance >= request.data['SIPAmount']:
            wallet.Balance = wallet.Balance - request.data['SIPAmount']
            wallet.save()
            sip = SIP()
            sip.userID = user
            sip.SIPAmount = request.data['SIPAmount']
            sip.SIPFrequency = request.data['SIPFrequency']
            sip.SIPStartDate = request.data['SIPStartDate']
            sip.SIPName = request.data['SIPName']
            sip.SIPEndDate = request.data['SIPEndDate']
            sip.save()
            for asset in request.data['Assets']:
                sipAsset = SIPAssets()
                sipAsset.SIPID = sip
                sipAsset.AssetName = FixedAssets.objects.get(FixedAssetCode=asset['AssetName'])
                sipAsset.AssetPercentage = asset['AssetPercentage']
                sipAsset.AssetStatus = asset['AssetStatus']
                sipAsset.save()
            return Response({"message": "SIP added successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Insufficient balance"}, status=status.HTTP_400_BAD_REQUEST)

class UserSIPAssetsAdd(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, userID, sipID):
        user = User.objects.get(id=userID)
        sip = SIP.objects.get(userID=user, SIPID=sipID)
        sipAssets = SIPAssets.objects.filter(SIPID=sip)
        for sa in sipAssets:
            if sa.AssetName.FixedAssetCode == request.data['AssetName']:
                sa.AssetPercentage = sa.AssetPercentage + request.data['AssetPercentage']
                sa.save()
                return Response({"message": "SIP updated successfully"}, status=status.HTTP_200_OK)
        sipAsset = SIPAssets()
        sipAsset.SIPID = sip
        sipAsset.AssetName = FixedAssets.objects.get(FixedAssetCode=request.data['AssetName'])
        sipAsset.AssetPercentage = request.data['AssetPercentage']
        sipAsset.AssetStatus = request.data['AssetStatus']
        sipAsset.save()
        totalPercentage = 0
        for sa in sipAssets:
            totalPercentage = totalPercentage + sa.AssetPercentage
        if totalPercentage + request.data['AssetPercentage'] > 100:
            return Response({"message": "Total percentage should be 100"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message": "SIP updated successfully"}, status=status.HTTP_200_OK)

class GetFixedAssets(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, _):
        assets = FixedAssetsSerializer.getFixedAssets(FixedAssetsSerializer)
        serializer = FixedAssetsSerializer(assets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

def job():
    sips = SIP.objects.all()
    for sip in sips:
        print("Checking SIP: for user: " + sip.userID.username + " with SIPID: " + str(sip.SIPID) + " at " + str(datetime.datetime.now()))
        if sip.SIPStartDate <= datetime.date.today() and sip.SIPEndDate >= datetime.date.today() and sip.SIPStatus == True:
            walletID = UserWalletSerializer.getUserWallet(UserWalletSerializer, userID=sip.userID)
            wallet = UserAssetsBalanceSerializer.deductUserWalletBalance(UserAssetsBalanceSerializer, walletID=walletID, amount=sip.SIPAmount)
            if wallet.Balance >= sip.SIPAmount:
                wallet.Balance = wallet.Balance - sip.SIPAmount
                wallet.save()
                sip.SIPStartDate = sip.SIPStartDate + datetime.timedelta(days=30)
                sip.save()
            deductableAmount = sip.SIPAmount
            for sipAsset in SIPAssets.objects.filter(SIPID=sip):
                if deductableAmount > 0:
                    if deductableAmount >= sipAsset.AssetPercentage * sip.SIPAmount / 100:
                        deductableAmount = deductableAmount - sipAsset.AssetPercentage * sip.SIPAmount / 100
                        sipAsset.AssetAmount = sipAsset.AssetPercentage * sip.SIPAmount / 100
                        sipAsset.save()
                    else:
                        sipAsset.AssetAmount = deductableAmount
                        sipAsset.save()
                        deductableAmount = 0
            if deductableAmount > 0:
                sip.EnoughBalance = False
                sip.save()
            else:
                sip.EnoughBalance = True
                sip.save()
        else:
            sip.EnoughBalance = False
            sip.save()
    print("Successfully executed for SIP: ", sip.SIPID)

class SIPCronJob(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, _):
        schedule.every().day.at("00:00").do(job)
        return Response({"message": "Cron job scheduled successfully"}, status=status.HTTP_200_OK)

#job()