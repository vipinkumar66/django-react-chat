from rest_framework.viewsets import ViewSet
from .models import Conversation, Message
from rest_framework.response import Response
from .serializers import MessageSerializer


class MessageViewSet(ViewSet):

    def list(self, request):
        channel_id = request.query_params.get("channel_id")
        try:
            conversation = Conversation.objects.get(channel_id= channel_id)
            message = conversation.message.all()
            serializer = MessageSerializer(message, many=True)
            return Response(serializer.data)
        except Conversation.DoesNotExist:
            return Response([])