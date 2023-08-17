from channels.generic.websocket import WebsocketConsumer

class MyConsumer(WebsocketConsumer):

    def connect(self):
        # Called on connection.
        # To accept the connection call:
        self.accept()
        # To reject the connection, call:
        # self.close()

    def receive(self, text_data):
        print(text_data)
        self.send(text_data="Hello world!")
        self.close()

    def disconnect(self, close_code):
        # Called when the socket closes
        pass