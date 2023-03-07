from django.urls import path
from .views import salesrep_list, salesrep_detail, customer_list, customer_detail, sale_list, sale_detail


urlpatterns = [
    path('salesrep/', salesrep_list, name='salesrep_list'),
    path('salesrep/<int:id>/', salesrep_detail, name='salesrep_detail'),
    path('customer/', customer_list, name='customer_list'),
    path('customer/<int:id>/', customer_detail, name='customer_detail'),
    path('sale/', sale_list, name='sale_list'),
    path('sale/<int:id>/', sale_detail, name='sale_detail'),
]
