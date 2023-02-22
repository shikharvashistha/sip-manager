from django.urls import path
from .views import *

urlpatterns = [
    path('sign/up/', SignUp.as_view(), name='signup'),
    path('sign/in/', SignIn.as_view(), name='signin'),
    path('sign/out/', SignOut.as_view(), name='signout'),
]