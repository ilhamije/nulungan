from rest_framework import serializers
from lapak.models import LapakModel


class LapakSerializer(serializers.ModelSerializer):
    class Meta:
        model = LapakModel
        fields = [
            'id',
            'lapak_name',
            'lapak_type',
            'image_url',
            'city',
            'address',
            'latitude',
            'longitude',
            'active',
            'valid',
            'socmed_link',
            'created'
        ]
