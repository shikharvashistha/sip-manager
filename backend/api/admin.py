from django.contrib import admin
from .models import *

admin.site.register(UserWallet)
admin.site.register(UserWalletBalance)
admin.site.register(SIP)
admin.site.register(SIPAssets)
admin.site.register(FixedAssets)
