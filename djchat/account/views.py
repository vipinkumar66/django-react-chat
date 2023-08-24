from rest_framework import viewsets
from .models import Account
from rest_framework.response import Response
from .serializers import AccountSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from django.conf import settings

class AccountViewset(viewsets.ViewSet):
    queryset = Account.objects.all()
    permission_classes = [IsAuthenticated]
    def list(self, request):
        user_id = request.query_params.get("user_id")
        queryset = Account.objects.get(id=user_id)
        serializer = AccountSerializer(queryset)
        return Response (serializer.data)


class JWTSetCookieMixin:
    def finalize_response(self, request, response, *args,**kwargs):
        if response.data.get("refresh"):
            response.set_cookie(
                settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"], response.data["refresh"],
                max_age = settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"],
                httponly = True,
                samesite = settings.SIMPLE_JWT["JWT_COOKIE_SAMESITE"]
            )

            if response.data.get("access"):
                response.set_cookie(
                settings.SIMPLE_JWT["ACCESS_TOKEN_NAME"], response.data["access"],
                max_age = settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
                httponly = True,
                samesite = settings.SIMPLE_JWT["JWT_COOKIE_SAMESITE"]
            )

        del response.data["access"]
        del response.data["refresh"]
        return super().finalize_response( request, response, *args,**kwargs)

class JWTCookieTokenObtainPairView(JWTSetCookieMixin, TokenObtainPairView):
    pass