from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication


from .models import *
from .serializers import *

class SignUp(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        confirm_password = request.data.get("confirm_password")

        if password != confirm_password:
            return Response({"error": "Passwords don't match"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(email, email, password)
        wallet = Wallet.objects.create(userID=user)
        token = Token.objects.create(user=user)

        serializer = WalletSerializer(wallet)
        response = Response(serializer.data)
        response.set_cookie(key="token", value=token.key)
        return response

class SignIn(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(username=email, password=password)

        if user is not None:
            login(request, user)
            token = Token.objects.get(user=user)
            wallet = Wallet.objects.get(userID=user)
            serializer = WalletSerializer(wallet)
            response = Response(serializer.data)
            response.set_cookie(key="token", value=token.key)
            return response
        else:
            return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)

class SignOut(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        request.user.auth_token.delete()
        response = Response(status=status.HTTP_200_OK)
        response.delete_cookie('token')
        return response
