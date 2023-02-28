from django.urls import path
from .views import *

urlpatterns = [
    path('sign/up/', SignUp.as_view(), name='signup'),
    path('sign/in/', SignIn.as_view(), name='signin'),
    path('sign/out/', SignOut.as_view(), name='signout'),
    path('user/<int:userID>/balance/',
         GetUserBalance.as_view(), name='userbalance'),
    path('user/<int:userID>/wallet/',
         UserSIPWallet.as_view(), name='usersipwallet'),
    path('user/<int:userID>/sip/', UserSIP.as_view(), name='usersip'),
    path('user/<int:userID>/sip/<int:sipID>/assets/',
         UserSIPAssets.as_view(), name='usersipassets'),
    path('user/<int:userID>/sip/<int:sipID>/edit/',
         UserSIPEdit.as_view(), name='usersipassets'),
    path('user/<int:userID>/sip/<int:sipID>/assets/edit',
         UserSIPAssetsEdit.as_view(), name='usersipassetsedit'),
    path('user/<int:userID>/wallet/deposit/',
         UserWalletDeposit.as_view(), name='userwalletdeposit'),
    path('user/<int:userID>/sip/add/', UserSIPAdd.as_view(), name='usersipadd'),
    path('user/<int:userID>/sip/<int:sipID>/assets/add/',
         UserSIPAssetsAdd.as_view(), name='usersipassetsadd'),
    path('fixed/assets/', GetFixedAssets.as_view(), name='fixedassets'),
    path('sip/cronjob/', SIPCronJob.as_view(), name='sipcronjob'),
]
