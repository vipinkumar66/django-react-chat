from rest_framework import serializers
from .models import Channel, Server


class ChannelSerializer(serializers.ModelSerializer):
    """
    A serializer for the `Channel` model.

    **Fields:**

    * `id` (int): The ID of the channel.
    * `name` (str): The name of the channel.
    * `description` (str): The description of the channel.
    * `members` (list): A list of the members of the channel.

    **Returns:**

    A `dict` object with the serialized data of the channel.
    """

    class Meta:
        model = Channel
        fields = "__all__"


class ServerSerializer(serializers.ModelSerializer):
    """
    A serializer for the `Server` model.

    **Fields:**

    * `id` (int): The ID of the server.
    * `name` (str): The name of the server.
    * `description` (str): The description of the server.
    * `total_member` (int): The total number of members of the server.
    * `channel_server` (list): A list of the channels in the server.

    **Returns:**

    A `dict` object with the serialized data of the server.
    """

    total_member =  serializers.SerializerMethodField()
    channel_server = ChannelSerializer(many=True)
    class Meta:
        model = Server
        exclude = ("members",)

    def get_total_member(self, obj):
        """
        This is to add a additional fields to the data

        **Arguments:**

        * `obj` (Server): The `Server` object.

        **Returns:**

        The total number of members of the server.
        """

        if hasattr(obj, "total_member"):
            return obj.total_member
        else:
            return None

    def to_representation(self, instance):
        """
        To overwrite the data reperesentation

        **Arguments:**

        * `instance` (Server): The `Server` object.

        **Returns:**

        A `dict` object with the serialized data of the server.
        """

        data = super().to_representation(instance)
        total_member = self.context.get("total_member")
        if not total_member:
            data.pop("total_member", None)
        return data
