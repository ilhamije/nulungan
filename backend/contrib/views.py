from django.http import JsonResponse


def char_count(request):
    text = request.GET.get("text", "")

    return JsonResponse({"count": len(text)})

# def index(request):
#     return JsonResponse({"hey": "there"})