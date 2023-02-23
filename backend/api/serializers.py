from rest_framework import serializers
from .models import *

class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserWallet
        fields = ('walletID', 'userID', 'isActive')

class FixedAssetsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FixedAssets
        fields = ('FixedAssetID', 'FixedAssetCode')

class UserWalletBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserWalletBalance
        fields = ('WalletBalanceID', 'walletID', 'AssetName', 'Balance')

class SIPSerializer(serializers.ModelSerializer):
    class Meta:
        model = SIP
        fields = ('SIPID', 'SIPName', 'SIPAmount', 'SIPFrequency', 'SIPStartDate', 'SIPEndDate', 'SIPStatus')

class SIPAssetsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SIPAssets
        fields = ('SIPAssetID', 'SIPID', 'AssetName', 'AssetAmount', 'SIPAssetStatus')