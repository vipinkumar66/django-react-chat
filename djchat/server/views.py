from rest_framework import viewsets
from .models import Server
from .serializers import ServerSerializer
from rest_framework.response import Response


class ServerListViewSet(viewsets.ViewSet):
    queryset = Server.objects.all()

    def list(self, request):
        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        if category:
            self.queryset = self.queryset.filter(category__name = category)

        if qty and type(qty)==int:
            self.queryset = self.queryset[:int(qty)]

        serializer = ServerSerializer(self.queryset, many=True)
        return Response(serializer.data)
