import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
# from sales_rest.models import Something
from sales_rest.models import AutomobileVO


def get_automobiles():
    url = "http://inventory-api:8000/api/automobiles/"
    response = requests.get(url)
    content = json.loads(response.content)
    for automobile in content["autos"]:
        AutomobileVO.objects.update_or_create(
            import_href=automobile["href"],
            defaults={
                "year": automobile["year"],
                "color": automobile["color"],
                "vin": automobile["vin"],
            }
        )

def poll():
    while True:
        print('Sales poller polling for data')
        try:
            get_automobiles()
            pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(5)


if __name__ == "__main__":
    poll()
