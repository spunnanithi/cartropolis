# CarCar

Team:

- Daniel Mitchell - Sales Microservice
- Sirasit Punnanithi - Service Microservice

## Design

---

## Service Microservice

### Front-End

#### Navigation Links

The React navigation bar features a dedicated "Service" dropdown menu to access the various links to create a technician, create a service appointment, view service appointment and view service appointment history by VIN.

#### Technician Form

The Technician Form page allows the user to create a technician by inputting the technician name and employee number in a form. Once the form is submitted, the form data will be converted to JSON and sent using a _POST_ HTTP request.

> Please see "Create view of technician" in the _**RESTful API CRUD Routes**_ section below for routing details.

#### Service Appointment Form

The Service Appointment Form page allows the user to create a service appointment by inputting the customer name, VIN, date/time, reason for service appointment and technician in a form. Once the form is submitted, the form data will be converted to JSON and sent using a _POST_ HTTP request.

> Please see "Create view of appointment" in the _**RESTful API CRUD Routes**_ section below for routing details.

#### Service Appointments List

The Service Appointment List page features a table that will list out all of the appointments that are currently not finished or canceled. The user is able to see if each respective appointment is a VIP on the far-left side of the table. **_A yellow star indicates the customer is a VIP while a red 'X' indicates the customer is not a VIP._** Also, the user is able to click on the 'Finish' or 'Cancel' buttons to remove the appointment from the listing.

> Please refer to "AutomobileVO (Value Object)" in the Models section below for more VIP information.

#### Service Appointment History by VIN

The Service Appointment History page features a search bar at the top of the page where the user can input a valid VIN to list out a history of appointment(s) for the related automobile. Only the associated automobile with the VIN will populate the table underneath the search bar.

<br/>

### Back-End

#### Models

**Appointment (Entity)** - The Appointment model is considered an entity since it has a life cycle (canceled or finished) and its own unique identity. An appointment instance has its own unique properties such as VIN, customer name, date/time, reason for appointment and technician assigned to each appointment. Additionally, the Appointment model contains a property to keep track of the finished or canceled status of each appointment.

**Technician (Entity)** - The Technician model is considered an entity since it has its own unique identity. Two technicians both named "Ryan" are considered two different entities and can be identified using their employee number.

**AutomobileVO (Value Object)** - The AutomobileVO model is considered a value object since automobile instances have no identity or life cycles. Additionally, the data within AutomobileVO model should not be updated or deleted in any way. The data stored within this model is used to determine if the customer is considered a VIP.

> A customer is considered a VIP if the automobile VIN used while booking a service appointment matches the VIN from any automobile that is present in the Inventory microservice.

#### Polling

The Service microservice polls the Inventory microservice every 60 seconds to obtain Automobile model data and stores the data under the AutomobileVO model in the Service microservice.

> A _GET_ HTTP request was made to http://inventory-api:8000/api/automobiles/ to poll for Automobile data from Inventory microservice.

<br/>

### RESTful API CRUD Routes

> The appropriate RESTful API HTTP endpoints, used to view, create, update and delete, are listed below that will interact with the Appointment, Technician and AutomobileVO models, accordingly.

#### Appointments

**List view of appointments**

Send _GET_ request to http://localhost:8080/api/appointments/ <br/>

Sample return JSON response data:<br/>

```
{
    "appointments": [
        {
            "id": 1,
            "vin": "1C3CC5FB2AN120174",
            "customer_name": "Betty",
            "date": "2023-03-03",
            "time": "06:20:08.937326",
            "reason": "Check engine light diagnosis",
            "is_finished": false,
            "is_vip": false,
            "technician": "Brian"
        },
        {
			"id": 3,
			"vin": "6GJ94YOC5SQ2O5A87",
			"customer_name": "Tim",
			"date": "2021-04-12",
			"time": "13:40:08.937326",
			"reason": "Check engine light diagnosis",
			"is_finished": true,
			"is_vip": false,
			"technician": "Robert"
		}
    ]
}
```

<br/>

**Create view of appointment**

Send _POST_ request to http://localhost:8080/api/appointments/

Sample JSON request object to create new appointment: <br/>

```
{
	"vin": "6GJ94YOC5SQ2O5A87",
	"customer_name": "Tim",
	"date": "2021-04-12T06:20:08.937326+00:00",
	"time": "2023-03-03T13:40:08.937326+00:00",
	"reason": "Check engine light diagnosis",
	"technician": 2
}
```

Sample return JSON response after sending POST request:<br/>

```
{
	"vin": "6GJ94YOC5SQ2O5A87",
	"customer_name": "Tim",
	"date": "2021-04-12T06:20:08.937326+00:00",
	"time": "2023-03-03T13:40:08.937326+00:00",
	"reason": "Check engine light diagnosis",
	"is_finished": false,
	"is_vip": false,
	"technician": {
		"id": 2,
		"name": "Robert",
		"employee_number": 391032
	}
}
```

<br/>

**Detail view of individual appointment based on ID**

Send _GET_ request to http://localhost:8080/api/appointments/id/ <br/>

Sample return JSON response for individual appointment:

```
{
			"id": 3,
			"vin": "6GJ94YOC5SQ2O5A87",
			"customer_name": "Tim",
			"date": "2021-04-12",
			"time": "13:40:08.937326",
			"reason": "Check engine light diagnosis",
			"is_finished": true,
			"is_vip": false,
			"technician": "Robert"
		}
```

<br/>

**Update view for individual appointment based on ID**

Send _PUT_ request to http://localhost:8080/api/appointments/id/ <br/>

Sample JSON request object to update an appointment: <br/>

> **NOTE**: Depending on which properties need to change, the request below may feature less properties.

```
{
	"customer_name": "Ryan",
	"reason": "Check engine light diagnosis",
	"technician": 2,
    "is_finished": true,
    "is_vip": false,
}
```

Sample return JSON response after updating individual appointment:

```
{
	"vin": "6GJ94YOC5SQ2O5A87",
	"customer_name": "Ryan",
	"date": "2021-04-12",
	"time": "13:40:08.937326",
	"reason": "Check engine light diagnosis",
	"is_finished": true,
	"is_vip": false,
	"technician": {
		"id": 2,
		"name": "Robert",
		"employee_number": 391032
	}
}
```

<br/>

**Delete view for individual appointment based on ID**

Send _DELETE_ request to http://localhost:8080/api/appointments/id/ <br/>

Sample return JSON response after succesfully deleting an appointment:<br/>

```
{
	"vin": "14912939DKL9DSS2",
	"customer_name": "Jane",
	"reason": "Check engine light diagnosis",
	"is_finished": false,
	"is_vip": false,
	"technician": {
		"id": 2,
		"name": "Robert",
		"employee_number": 391032
	}
}
```

Sample return JSON response after deleting an appointment that does not exist:<br/>

```
{
	"message": "Does not exist"
}
```

<br/>

#### Technicians

**List view of technicians**

Send _GET_ request to http://localhost:8080/api/technicians/<br/>

Sample return JSON response data: <br/>

```
{
    technicians: [
        {
			"id": 1,
			"name": "RieRie",
			"employee_number": 193428
		},
		{
			"id": 2,
			"name": "Robert",
			"employee_number": 391032
		},
    ]
}
```

<br/>

**Create view of technician**

Send _POST_ request to http://localhost:8080/api/technicians/<br/>

Sample JSON request object to create a technician:<br/>

```
{
	"name": "Robert",
	"employee_number": "391032"
}
```

Sample return JSON response after sending POST request:<br/>

```
{
	"id": 2,
	"name": "Robert",
	"employee_number": "391032"
}
```

<br/>

**Detail view of individual technican based on ID**

Send _GET_ request to http://localhost:8080/api/technicians/id/<br/>

Sample return JSON response for an individual technician:<br/>

```
{
	"id": 2,
	"name": "Robert",
	"employee_number": 391032
}
```

<br/>

#### AutomobileVO (Value Object)

**List view of automobilesVO that was polled from Inventory microservice**

Send _GET_ request to http://localhost:8080/api/automobiles/

Sample return JSON response data:<br/>

```
{
    "autos": [
        {
			"import_vin": "/api/automobiles/1C3CC5FB2AN120321/",
			"color": "blue",
			"year": 2010
		},
		{
			"import_vin": "/api/automobiles/1C3D5FB2AN12dsfsd/",
			"color": "red",
			"year": 2014
		}
    ]
}
```

---

## Sales microservice

Explain your models and integration with the inventory
microservice, here.

http://localhost:8090/api/salesrep/ for the sale reps list and to create a new sales rep
http://localhost:8090/api/salesrep/<int:id>/ for the sales rep information
http://localhost:8090/api/salesrep/<int:id>/record/ for the sale records of individual employees
http://localhost:8090/api/sale/ for the sales list and to create a sale
http://localhost:8090/api/sale/<int:id>/ for the sale details
http://localhost:8090/api/customer/ for the customer list and to create a customer
http://localhost:8090/api/customer/<int:id>/ for customer details
