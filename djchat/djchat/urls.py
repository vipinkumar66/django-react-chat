from django.contrib import admin
from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/docs', SpectacularAPIView.as_view(), name="schema"),
    path("api/auth/schema/ui", SpectacularSwaggerView.as_view())
]
