from django.db import models
from django.contrib.auth.models import User

class UserWallet(models.Model):
    class Meta:
        db_table = 'UserWallet'
        app_label = 'api'
    walletID = models.AutoField(primary_key=True)
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    isActive = models.BooleanField(default=True)

    def __str__(self):
        return self.walletID

class FixedAssets(models.Model):
    class Meta:
        db_table = 'FixedAssets'
        app_label = 'api'
    FixedAssetID = models.AutoField(primary_key=True)
    FixedAssetCode = models.CharField(max_length=100)

    def __str__(self):
        return self.FixedAssetCode

class UserAssetsBalance(models.Model):
    class Meta:
        db_table = 'UserAssetsBalance'
        app_label = 'api'
    WalletAssetBalanceID = models.AutoField(primary_key=True)
    walletID = models.ForeignKey(UserWallet, on_delete=models.CASCADE)
    Balance = models.FloatField(default=0.0) # Balance in USDC

    def __str__(self):
        return self.AssetID

class SIP(models.Model):
    class Meta:
        db_table = 'SIP'
        app_label = 'api'
    SIPID = models.AutoField(primary_key=True)
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    SIPName = models.CharField(max_length=100)
    SIPAmount = models.FloatField(default=0.0)
    SIPFrequency = models.CharField(max_length=100)
    SIPStartDate = models.DateField()
    SIPEndDate = models.DateField()
    TotalInvestedAmount = models.FloatField(default=0.0)
    CurrentInvestedAmount = models.FloatField(default=0.0)
    EnoughBalance = models.BooleanField(default=True)
    SIPStatus = models.BooleanField(default=True)

    def __str__(self):
        return self.SIPID

class SIPAssets(models.Model):
    class Meta:
        db_table = 'SIPAssets'
        app_label = 'api'
    SIPAssetID = models.AutoField(primary_key=True)
    SIPID = models.ForeignKey(SIP, on_delete=models.CASCADE)
    AssetName = models.ForeignKey(FixedAssets, on_delete=models.CASCADE)
    AssetPercentage = models.FloatField(default=0.0)
    AssetStatus = models.BooleanField(default=True)

    def __str__(self):
        return self.SIPAssetID