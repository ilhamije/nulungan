import uuid
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from .models import LapakModel, LikeLapakModel


class LapakSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField()

    class Meta:
        model = LapakModel
        # fields = '__all__'
        fields = ('id',
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
                  'created_by',
                  'likes')

    def get_likes(self, obj):
        lapak = obj.id
        # print(lapak, type(lapak))
        res = LikeLapakModel.objects.filter(lapak=lapak)
        if res:
            return res.count()
        else:
            return 0


class LikeLapakSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikeLapakModel
        fields = '__all__'
        validators = [
            UniqueTogetherValidator(
                queryset=LikeLapakModel.objects.all(),
                fields=['lapak', 'user'],
                message='The user already liked this.'
            )
        ]


