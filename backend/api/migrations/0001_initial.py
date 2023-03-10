# Generated by Django 4.1.7 on 2023-02-28 02:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='FixedAssets',
            fields=[
                ('FixedAssetID', models.AutoField(primary_key=True, serialize=False)),
                ('FixedAssetCode', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'FixedAssets',
            },
        ),
        migrations.CreateModel(
            name='SIP',
            fields=[
                ('SIPID', models.AutoField(primary_key=True, serialize=False)),
                ('SIPName', models.CharField(max_length=100)),
                ('SIPAmount', models.FloatField(default=0.0)),
                ('SIPFrequency', models.CharField(max_length=100)),
                ('SIPStartDate', models.DateField()),
                ('SIPEndDate', models.DateField()),
                ('TotalInvestedAmount', models.FloatField(default=0.0)),
                ('CurrentInvestedAmount', models.FloatField(default=0.0)),
                ('EnoughBalance', models.BooleanField(default=True)),
                ('SIPStatus', models.BooleanField(default=True)),
                ('userID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'SIP',
            },
        ),
        migrations.CreateModel(
            name='UserWallet',
            fields=[
                ('walletID', models.AutoField(primary_key=True, serialize=False)),
                ('isActive', models.BooleanField(default=True)),
                ('userID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'UserWallet',
            },
        ),
        migrations.CreateModel(
            name='UserAssetsBalance',
            fields=[
                ('WalletAssetBalanceID', models.AutoField(primary_key=True, serialize=False)),
                ('Balance', models.FloatField(default=0.0)),
                ('walletID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.userwallet')),
            ],
            options={
                'db_table': 'UserAssetsBalance',
            },
        ),
        migrations.CreateModel(
            name='SIPAssets',
            fields=[
                ('SIPAssetID', models.AutoField(primary_key=True, serialize=False)),
                ('AssetPercentage', models.FloatField(default=0.0)),
                ('AssetStatus', models.BooleanField(default=True)),
                ('AssetName', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.fixedassets')),
                ('SIPID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.sip')),
            ],
            options={
                'db_table': 'SIPAssets',
            },
        ),
    ]
