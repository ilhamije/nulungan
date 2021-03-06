import uuid
from django.db import models


class LapakModel(models.Model):
    id = models.UUIDField( primary_key=True, default=uuid.uuid4, editable=False )
    index = 0
    lapak_name = models.CharField(max_length=100, blank=True)
    lapak_type = models.CharField(max_length=100, blank=True, default='')
    image_url = models.URLField(blank=True)
    city = models.CharField(max_length=100)
    address = models.CharField(max_length=100, blank=True, default='')
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True)
    active = models.BooleanField(default=1)
    valid = models.BooleanField(default=0)
    socmed_link = models.URLField(blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering=['created']

