from django.db import models
from django.contrib.auth.models import User

class Wallet(models.Model):
    class Meta:
        db_table = 'Wallet'
        app_label = 'api'
    walletID = models.AutoField(primary_key=True)
    userID = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.walletID

class FixedAssets(models.Model):
    class Meta:
        db_table = 'FixedAssets'
        app_label = 'api'
    FixedAssetID = models.AutoField(primary_key=True)
    FixedAssetName = models.CharField(max_length=100)

    def __str__(self):
        return self.FixedAssetID

class Assets(models.Model):
    class Meta:
        db_table = 'Assets'
        app_label = 'api'
    AssetID = models.AutoField(primary_key=True)
    WalletID = models.ForeignKey(Wallet, on_delete=models.CASCADE)
    AssetID = models.ForeignKey(FixedAssets, on_delete=models.CASCADE)
    Balance = models.DecimalField(max_digits=10, decimal_places=2)
    Amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.AssetID