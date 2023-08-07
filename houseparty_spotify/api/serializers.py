from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Room
        # fields that we want to include in the serialization
        fields = ('id', 'code', 'host', 'guest_can_pause', 'votes_to_skip', 'created_at')
        

class CreateRoomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip')


class UpdateRoomSerializer(serializers.ModelSerializer):

    code = serializers.CharField(validators=[])

    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip', 'code')
