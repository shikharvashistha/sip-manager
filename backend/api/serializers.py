from rest_framework.response import Response
from rest_framework import serializers
from .models import *

class UserWalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserWallet
        fields = '__all__'

    def create(self, validated_data):
        userWallet = UserWallet.objects.create(**validated_data)
        userWallet.save()
        return userWallet

    def getUserWallet(self, userID):
        userWallet = UserWallet.objects.get(userID=userID)
        return userWallet

class FixedAssetsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FixedAssets
        fields = '__all__'

    def create(self, validated_data):
        fixedAssets = FixedAssets.objects.create(**validated_data)
        fixedAssets.save()
        return fixedAssets

    def getFixedAssets(self):
        fixedAssets = FixedAssets.objects.all()
        return fixedAssets

class UserAssetsBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAssetsBalance
        fields = '__all__'

    def create(self, validated_data):
        userAssetsBalance = UserAssetsBalance.objects.create(**validated_data)
        userAssetsBalance.save()
        return userAssetsBalance

    def updateUserWalletBalance(self, walletID, amount):
        userAssetsBalance = UserAssetsBalance.objects.get(walletID=walletID)
        userAssetsBalance.Balance = userAssetsBalance.Balance + amount
        userAssetsBalance.save()
        return userAssetsBalance


class SIPSerializer(serializers.ModelSerializer):
    class Meta:
        model = SIP
        fields = '__all__'

    def create(self, validated_data):
        sip = SIP.objects.create(**validated_data)
        sip.save()
        return sip

class SIPAssetsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SIPAssets
        fields = '__all__'

    def create(self, validated_data):
        sipAssets = SIPAssets.objects.create(**validated_data)
        sipAssets.save()
        return sipAssets