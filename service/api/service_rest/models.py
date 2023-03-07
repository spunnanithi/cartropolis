from django.db import models

# Create your models here.
from django.db import models
from django.urls import reverse


# Create your models here.
class AutomobileVO(models.Model):
    import_vin = models.CharField(max_length=200, unique=True)
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()


class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.PositiveIntegerField(unique=True)

    def get_api_url(self):
        return reverse("api_list_technicians", kwargs={"pk": self.id})

    def __str__(self):
        return self.name


class Appointment(models.Model):
    vin = models.CharField(max_length=17)
    customer_name = models.CharField(max_length=200)
    date = models.DateTimeField(null=True, blank=True)
    time = models.DateTimeField(null=True, blank=True)
    reason = models.CharField(max_length=200)
    is_finished = models.BooleanField(default=False)
    is_vip = models.BooleanField(default=False)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_list_appointments", kwargs={"pk": self.id})
