import uuid
from django.db import models
from backend import settings
from simple_history.models import HistoricalRecords


class LapakModel(models.Model):
    id = models.UUIDField( primary_key=True, default=uuid.uuid4, editable=False )
    index = 0
    lapak_name = models.CharField(max_length=100, blank=True, default='Fulan')
    lapak_type = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    address = models.TextField(max_length=255)
    latitude = models.DecimalField(
        max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(
        max_digits=9, decimal_places=6, blank=True, null=True)
    image_url = models.URLField(blank=True)
    active = models.BooleanField(default=True)
    valid = models.BooleanField(default=False)
    socmed_link = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        settings.base.AUTH_USER_MODEL, on_delete=models.PROTECT, default=1)
    history = HistoricalRecords()

    class Meta:
        ordering=['-created_at']

    def __str__(self):
        """String for representing the Model object."""
        return self.id


class LikeLapakModel(models.Model):
    lapak = models.ForeignKey(LapakModel, on_delete=models.CASCADE, related_name="likes")
    user = models.ForeignKey(
        settings.base.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [['lapak', 'user']]
