import uuid

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import LapakModel, LikeLapakModel
from .serializers import LapakSerializer, LikeLapakSerializer


class LapakList(APIView):
    """
    List all code lapaks, or create a new lapak.
    """
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, request, format=None):
        lapaks = LapakModel.objects.all()
        serializer = LapakSerializer(lapaks, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        data = request.data
        data['created_by'] = request.user.id
        serializer = LapakSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LapakDetail(APIView):
    """
    Retrieve, update or delete a code lapak.
    """
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_object(self, lapak_id):
        try:
            return LapakModel.objects.get(id=lapak_id)
            # print(lapak)
        except LapakModel.DoesNotExist:
            return Response({"msg": "Nothing to see here."}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, lapak_id, *args, **kwargs):
        lapak = self.get_object(lapak_id)
        if not lapak:
            return Response({"msg": "this id is not exist {}".format(lapak)},
                            status=status.HTTP_400_BAD_REQUEST)
        serializer = LapakSerializer(lapak)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        lapak = self.get_object(pk)
        serializer = LapakSerializer(lapak, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        lapak = self.get_object(pk)
        lapak.delete()
        return Response(status=204)


class LikeLapakList(APIView):
    """
    List all code lapaks, or create a new lapak.
    """
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_object(self, lapak_id):
        try:
            return LapakModel.objects.get(id=lapak_id).id
        except LapakModel.DoesNotExist:
            return Response({"msg": "Nothing to see here."}, status=status.HTTP_404_NOT_FOUND)


    def post(self, request, lapak_id, *args, **kwargs):
        data = dict()
        data['lapak'] = self.get_object(lapak_id).hex
        data['user'] = request.user.id
        print('data:', data)
        serializer = LikeLapakSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
