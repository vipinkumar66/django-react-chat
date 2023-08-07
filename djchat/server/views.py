from rest_framework import viewsets
from .models import Server
from rest_framework import exceptions
from django.db.models import Count
from .serializers import ServerSerializer
from rest_framework.validators import ValidationError
from rest_framework.response import Response


class ServerListViewSet(viewsets.ViewSet):
    """
    A viewset that lists all servers.

    **Arguments:**

    * `category` (str): The category of the servers to be listed.
    * `qty` (int): The number of servers to be listed.
    * `by_user` (bool): Whether to list servers that the authenticated user is a member of.
    * `by_num_member` (bool): Whether to include the total number of members in the serialized data.
    * `by_server` (str): The ID of the server to be listed.

    **Raises:**

    * `exceptions.AuthenticationFailed` if the authenticated user is not authorized to list servers.
    * `ValidationError` if the `by_server` parameter is not a valid ID or if the server with the specified ID does not exist.

    **Returns:**

    A `Response` object with the serialized data of the servers.
    """

    queryset = Server.objects.all()

    def list(self, request):
        """
        Lists all servers.

        **Arguments:**

        * `request` (rest_framework.request.Request): The HTTP request object.

        **Returns:**

        A `Response` object with the serialized data of the servers.
        """

        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user") == "true"
        by_num_member = request.query_params.get("by_num_member") == "true"
        by_server = request.query_params.get("by_server")

        # Check if the authenticated user is authorized to list servers.
        if by_user or by_server:
            if not request.user.is_authenticated:
                raise exceptions.AuthenticationFailed()

        # Filter the queryset based on the query parameters.
        if category:
            self.queryset = self.queryset.filter(category__name = category)

        if by_user:
            user_id = request.user.id
            self.queryset = self.queryset.filter(members=user_id)

        if by_server:
            try:
                self.queryset = self.queryset.filter(id = by_server)
                if not self.queryset.exists():
                    raise ValidationError(detail=f"server with id {by_server} not found")
            except ValueError:
                raise ValidationError(detail=f"server value error")

        # Annotate the queryset with the total number of members if requested.
        if by_num_member:
            self.queryset = self.queryset.annotate(total_member = Count("members"))

        # Limit the queryset to the specified number of servers.
        if qty:
            self.queryset = self.queryset[:int(qty)]

        # Serialize the queryset.
        serializer = ServerSerializer(self.queryset, many=True,
                                      context={"total_member":by_num_member})

        return Response(serializer.data)
