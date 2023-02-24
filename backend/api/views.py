from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import datetime


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

        wallet = UserWallet.objects.create(userID=user)
        wallet.save()

        btc = FixedAssets.objects.create(FixedAssetCode='BTC')
        btc.save()

        balance = UserWalletBalance.objects.create(walletID=wallet, AssetName=btc, Balance=100.0)
        balance.save()

        sip = SIP.objects.create(userID=user, SIPName='Default SIP', SIPAmount=100.0, SIPFrequency='Monthly', SIPStartDate=datetime.date.today(), SIPEndDate=datetime.date.today() + datetime.timedelta(days=365), SIPStatus=True)
        sip.save()

        token = Token.objects.create(user=user)
        token.save()
        return Response({"token": token.key, "userID": user.id, "SIPID": sip.SIPID}, status=status.HTTP_201_CREATED)

class SignIn(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(request, username=email, email=email, password=password)

        if user is not None:
            login(request, user)
            token = Token.objects.get(user=user)
            response = Response({"token": token.key, "userID": user.id}, status=status.HTTP_200_OK)
            return response
        else:
            return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)


class SignOut(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)

class SIPDetails(APIView):
    def get(self, _, userID):
        user = User.objects.get(id=userID)
        wallet = UserWallet.objects.get(userID=user)
        sips = SIP.objects.filter(walletID=wallet)
        serializer = SIPSerializer(sips, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CreateSIP(APIView):
    def post(self, request, userID):
        user = User.objects.get(id=userID)
        sip = SIP.objects.create(userID=user, SIPName=request.data.get("SIPName"), SIPAmount=request.data.get("SIPAmount"), SIPFrequency=request.data.get("SIPFrequency"), SIPStartDate=datetime.date.today(), SIPEndDate=request.data.get("SIPEndDate"), SIPStatus=True)
        sip.save()
        assets = SIPAssets.objects.create(SIPID=sip, AssetName=FixedAssets.objects.get(FixedAssetCode='BTC'), AssetAmount=100.0)
        assets.save()
        return Response({"message": "SIP created successfully", "SIPID": sip.SIPID}, status=status.HTTP_201_CREATED)

class AddAssetToSIP(APIView):
    #url looks like http://127.0.0.1:8000/user/add/1/sip/2/asset/
    def post(self, request, userID, sipID):
        user = User.objects.get(id=userID)
        sip = SIP.objects.get(SIPID=sipID)
        asset = FixedAssets.objects.get(FixedAssetCode=request.data.get("FixedAssetCode"))
        if SIPAssets.objects.filter(SIPID=sip, AssetName=asset).exists():
            return Response({"error": "Asset already present in the SIP"}, status=status.HTTP_400_BAD_REQUEST)
        sipAsset = SIPAssets.objects.create(SIPID=sip, AssetName=asset, AssetAmount=request.data.get("AssetAmount"))
        sipAsset.save()
        return Response({"message": "Asset added to the SIP successfully"}, status=status.HTTP_200_OK)


class RemoveAssetFromSIP(APIView):
    def post(self, request, userID, sipID):
        user = User.objects.get(id=userID)
        sip = SIP.objects.get(SIPID=sipID)
        asset = FixedAssets.objects.get(FixedAssetCode=request.data.get("FixedAssetCode"))
        if not SIPAssets.objects.filter(SIPID=sip, AssetName=asset).exists():
            return Response({"error": "Asset not present in the SIP"}, status=status.HTTP_400_BAD_REQUEST)
        sipAsset = SIPAssets.objects.get(SIPID=sip, AssetName=asset)
        sipAsset.delete()
        return Response({"message": "Asset removed from the SIP successfully"}, status=status.HTTP_200_OK)

class GetUserBalance(APIView):
    def get(self, _, userID):
        user = User.objects.get(id=userID)
        wallet = UserWallet.objects.get(userID=user)
        walletBalance = UserWalletBalance.objects.filter(walletID=wallet)
        serializer = UserWalletBalanceSerializer(walletBalance, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)