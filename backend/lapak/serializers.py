import uuid
from rest_framework import serializers

from .models import LapakModel, LikeLapakModel


class LapakSerializer(serializers.ModelSerializer):
    likes = serializers.StringRelatedField(many=True)

    class Meta:
        model = LapakModel
        # fields = [
        #     'id',
        #     'lapak_name',
        #     'lapak_type',
        #     'city',
        #     'address',
        #     'latitude',
        #     'longitude',
        #     'image_url',
        #     'active',
        #     'valid',
        #     'socmed_link',
        #     'created_at',
        #     'created_by',
        #     'likes',
        # ]
        fields = '__all__'


class LikeLapakSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikeLapakModel
        # unique_together = ['album', 'order']
        fields = '__all__'
