from django.contrib import admin
from .models import *

admin.site.register(UserWallet)
admin.site.register(FixedAssets)
admin.site.register(UserAssetsBalance)
admin.site.register(SIP)
admin.site.register(SIPAssets)
