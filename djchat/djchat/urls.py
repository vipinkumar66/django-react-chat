from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from server import views
from rest_framework.routers import DefaultRouter
from webchat.consumer import WebsocketConsumer
from webchat.views import MessageViewSet

router = DefaultRouter()

router.register("api/server/select", views.ServerListViewSet)
router.register("api/server/category", views.CategoryListViewSet)
router.register("api/messages", MessageViewSet, basename='message')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/docs', SpectacularAPIView.as_view(), name="schema"),
    path("api/auth/schema/ui", SpectacularSwaggerView.as_view()),
]+ router.urls

websocket_urlpatterns = [path('<str:serverId>/<str:channelId>', WebsocketConsumer.as_asgi())]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)