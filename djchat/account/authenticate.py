from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings

class JWTCookieAuthentication(JWTAuthentication):
    """
    Custom JWT authentication class that allows JWT tokens to be stored in cookies.

    This authentication class inherits from the base JWTAuthentication class provided
    by the djangorestframework-simplejwt package. It overrides the default behavior
    of JWT authentication by extracting the token from a cookie in the request and
    validating it.

    This is useful when you want to store the JWT token in a cookie instead of sending
    it in the headers of every request.

    Note: The JWT token is expected to be stored in a cookie with the name specified
    in settings.SIMPLE_JWT['ACCESS_TOKEN_NAME'].

    Usage:
    In your Django settings, you can specify the custom authentication class:
    REST_FRAMEWORK = {
        'DEFAULT_AUTHENTICATION_CLASSES': [
            'path.to.JWTCookieAuthentication',
        ],
    }
    """

    def authenticate(self, request):
        """
        Authenticate the user based on the JWT token stored in a cookie.

        Args:
            request (HttpRequest): The incoming HTTP request.

        Returns:
            tuple: A tuple containing a user instance and the validated token if
                   authentication is successful, or None if authentication fails.
        """

        # Attempt to retrieve the JWT token from the cookie
        raw_token = request.COOKIES.get(settings.SIMPLE_JWT['ACCESS_TOKEN_NAME']) or None

        if not raw_token:
            # No token found in the cookie, authentication fails
            return None

        # Validate the token using the base JWTAuthentication class
        validate_token = self.get_validated_token(raw_token)

        # Retrieve the user associated with the token
        user = self.get_user(validate_token)

        # Return a tuple containing the user and the validated token
        return user, validate_token
