from rest_framework import serializers

from .models import LapakModel


class LapakSerializer(serializers.ModelSerializer):
    class Meta:
        model = LapakModel
        fields = [
            'id',
            'lapak_name',
            'lapak_type',
            'city',
            'address',
            'latitude',
            'longitude',
            'image_url',
            'active',
            'valid',
            'socmed_link',
            'created_at',
            'created_by'
        ]
