from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from django.contrib.auth import get_user_model
from .models import Conversation, Message

user = get_user_model()

class WebsocketConsumer(JsonWebsocketConsumer):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.channel_id = None
        self.user = None #for the username to join

    def connect(self):

        self.accept()

        self.channel_id = self.scope["url_route"]["kwargs"]["channelId"]
        self.user = user.objects.get(id=1)

        async_to_sync(self.channel_layer.group_add)(
            self.channel_id,
            self.channel_name
        )

    def receive_json(self, content):

        channel_id = self.channel_id
        sender = self.user
        message = content["message"]

        conversation, created = Conversation.objects.get_or_create(channel_id=channel_id)
        new_message = Message.objects.create(conversation=conversation, sender=sender,
                                            content=message)
        print(new_message)

        async_to_sync(self.channel_layer.group_send)(
            self.channel_id, {
                "type":"chat.message",
                "new_message":{
                    "content":new_message.content,
                    "sender":new_message.sender.username,
                    "id":new_message.id,
                    "timestamp":new_message.timestamp.isoformat()
                    }
            }
        )

    def chat_message(self, event):
        self.send_json(event)

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.channel_id, self.channel_name)
        super().disconnect(close_code)