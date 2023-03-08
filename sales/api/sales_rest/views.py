from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from .models import SaleRecord, AutomobileVO, Customer, SalesRep
from django.http import JsonResponse
import json
from django.core.exceptions import ObjectDoesNotExist


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "year",
        "import_href",
        "color",
        "vin",
        "sold",
        "id",
        ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone",
        "id",
        ]


class SalesRepEncoder(ModelEncoder):
    model = SalesRep
    properties = [
        "name",
        "employee_id",
        "id",
        ]


class SaleRecordEncoder(ModelEncoder):
    model = SaleRecord
    properties = [
        "sales_rep",
        "customer",
        "automobile",
        "price",
        "id",
        ]
    encoders = {
        "sales_rep": SalesRepEncoder(),
        "customer": CustomerEncoder(),
        "automobile": AutomobileVOEncoder(),
        }



@require_http_methods(["GET", "POST"])
def salesrep_list(request):
    if request.method == "GET":
        salesrep = SalesRep.objects.all()
        return JsonResponse(
            {"salesrep" : salesrep},
            encoder=SalesRepEncoder,
        )

    else:
        content = json.loads(request.body)
        salesrep = SalesRep.objects.create(**content)
        return JsonResponse(
            {"salesrep": salesrep},
            encoder=SalesRepEncoder,
            safe=False,
            )


@require_http_methods(["GET"])
def salesrep_detail(request, id):
    if request.method == "GET":
        salesrep = SalesRep.objects.filter(id=id)
        return JsonResponse(
            salesrep,
            encoder=SalesRepEncoder,
            safe=False,
            )


@require_http_methods(["GET", "POST"])
def customer_list(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
            )


@require_http_methods(["GET"])
def customer_detail(request, id):
    if request.method == "GET":
        customer = Customer.objects.filter(id=id)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
            )


@require_http_methods(["GET", "POST"])
def sale_list(request):
    if request.method == "GET":
        sales = SaleRecord.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleRecordEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)

        content["customer"] = Customer.objects.get(name=content["customer"])

        content["sales_rep"] = SalesRep.objects.get(employee_id=content["sales_rep"])

        automobile = None
        try:
            content["automobile"] = AutomobileVO.objects.get(vin=content["automobile"])
        except AutomobileVO.DoesNotExist:
            response = JsonResponse(
                {"message": "Could not locate automobile"}
            )
            response.status_code = 404
            return response

        if content["automobile"].sold:
            response = JsonResponse(
                {"message": "This automobile is already sold"}
            )
            response.status_code = 404
            return response

        sales = SaleRecord.objects.create(**content)

        automobile = sales.automobile
        automobile.sold = True
        automobile.save()

        return JsonResponse(
            {"sales": sales},
            encoder=SaleRecordEncoder,
            safe=False
        )


@require_http_methods(["GET"])
def sales_rep_record(request, id):
    if request.method == "GET":
        try:
            sales = SaleRecord.objects.filter(sales_rep__employee_id=id)
            return JsonResponse(
            {"sales": sales},
            encoder=SaleRecordEncoder,
            safe=False
        )
        except SaleRecord.DoesNotExist:
            response = JsonResponse(
                {"message": "No sales record"}
            )
            response.status_code = 404
            return response


@require_http_methods(["GET", "DELETE"])
def sale_detail(request, id):
    if request.method == "GET":
        sale = SaleRecord.objects.filter(id=id)
        return JsonResponse(
            sale,
            encoder=SaleRecordEncoder,
            safe=False,
            )
    else:
        count, _ = SaleRecord.objects.filter(id=id).delete()
        return JsonResponse(
            {"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def automobile_list(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobiles": automobiles},
            encoder=AutomobileVOEncoder,
        )
    else:
        content = json.loads(request.body)
        automobile = AutomobileVO.objects.create(**content)
        return JsonResponse(
            automobile,
            encoder=AutomobileVOEncoder,
            safe=False,
            )
