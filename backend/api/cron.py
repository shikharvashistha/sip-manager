from .models import *
from .serializers import *

import datetime



if __name__ == '__main__':
    sips = SIP.objects.filter(SIPStatus=True)
    for sip in sips:
        if sip.SIPStartDate == datetime.date.today():
            user_wallet = UserWallet.objects.get(userID=sip.userID)
            user_wallet_balance = UserWalletBalance.objects.get(walletID=user_wallet)
            if user_wallet_balance.Balance >= sip.SIPAmount:
                user_wallet_balance.Balance -= sip.SIPAmount
                user_wallet_balance.save()
                sip_wallet_balance = UserWalletBalance.objects.get(walletID=sip.walletID)
                sip_wallet_balance.Balance += sip.SIPAmount
                sip_wallet_balance.save()
            else:
                sip.EnoughBalance = False
                sip.save()