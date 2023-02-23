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

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=email, email=email, password=password)
        user.save()

        token = Token.objects.create(user=user)
        token.save()
        return Response({"token": token.key}, status=status.HTTP_200_OK)

class SignIn(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(request, username=email, email=email, password=password)

        if user is not None:
            login(request, user)
            token = Token.objects.get(user=user)
            response = Response({"token": token.key}, status=status.HTTP_200_OK)
            return response
        else:
            return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)


class SignOut(APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)