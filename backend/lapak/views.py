from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from lapak.models import LapakModel
from lapak.serializers import LapakSerializer


@csrf_exempt
def lapak_list(request):
    """
    List all code lapaks, or create a new lapak.
    """
    if request.method == 'GET':
        lapaks = LapakModel.objects.all()
        serializer = LapakSerializer(lapaks, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = LapakSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def lapak_detail(request, pk):
    """
    Retrieve, update or delete a code lapak.
    """
    try:
        lapak = LapakModel.objects.get(pk=pk)
    except LapakModel.DoesNotExist:
        return JsonResponse({"msg": "The droid is not found, bro."}, status=404)

    if request.method == 'GET':
        serializer = LapakSerializer(lapak)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = LapakSerializer(lapak, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        lapak.delete()
        return HttpResponse(status=204)
