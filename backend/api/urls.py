from django.urls import path
from .views import *

urlpatterns = [
    path('sign/up/', SignUp.as_view(), name='signup'),
    path('sign/in/', SignIn.as_view(), name='signin'),
    path('sign/out/', SignOut.as_view(), name='signout'),
    path('user/get/<int:userID>/sip/', SIPDetails.as_view(), name='sipdetails'),
    path('user/create/<int:userID>/sip/', CreateSIP.as_view(), name='createsip'),
    path('user/add/<int:userID>/sip/<int:sipID>/asset/', AddAssetToSIP.as_view(), name='addassettosip'),
    path('user/remove/<int:userID>/sip/<int:sipID>/asset/', RemoveAssetFromSIP.as_view(), name='removeassetfromsip'),
    path('user/get/<int:userID>/balance/', GetUserBalance.as_view(), name='getuserbalance'),
]