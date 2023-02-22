from rest_framework import serializers
from .models import *

class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ('walletID', 'userID')

class FixedAssetsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FixedAssets
        fields = ('FixedAssetID', 'FixedAssetName')

class AssetsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assets
        fields = ('AssetID', 'WalletID', 'AssetID', 'Balance', 'Amount')