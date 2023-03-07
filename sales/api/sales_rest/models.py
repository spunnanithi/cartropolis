from django.db import models


class AutomobileVO(models.Model):
    year = models.PositiveSmallIntegerField()
    import_href = models.CharField(
        max_length=300,
        null=True,
        unique=True)
    color = models.CharField(max_length=100)
    vin = models.CharField(max_length=100, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.vin}"


class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} {self.address} {self.phone}"


class SalesRep(models.Model):
    name = models.CharField(max_length=100)
    employee_id = models.PositiveSmallIntegerField()


class SaleRecord(models.Model):
    sales_rep = models.ForeignKey(
        SalesRep,
        related_name = "sales",
        on_delete=models.CASCADE
        )
    customer = models.ForeignKey(
        Customer,
        related_name = "sales",
        on_delete=models.CASCADE
        )
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name = "sales",
        on_delete=models.CASCADE
        )
    price = models.PositiveSmallIntegerField()


