# CarCar

Team:

- Daniel Mitchell - Sales Microservice
- Sirasit Punnanithi - Service Microservice

## Design

<img src="project-beta-diagram.png" width="1000" height="500">

- For this project, our group decided to split the application up into three microservices: Service microservice, Sales microservice and Inventory microservice. Each microservice will _"own"_ a particular set of data for which other microservices may poll to utilize as value objects within each respective microservice.

  - Front-end: our group decided to utilize the React library to create a fast and responsive webpage to enhance user experience. The user is able to interact with the webpage at http://localhost:3000/.
  - Back-end: our group decided to utilize the Django framework to set up RESTful APIs for each microservice. RESTful API requests can be made to the appropriate URLs to obtain necessary data from each microservice.
  - Docker: a `docker-compose.yml` is provided so it would be easy to build and run Docker containers with necessary dependencies for the whole application.

### Getting Started

This is the link to the repo where you will first need to go in order to fork and clone this project.

https://gitlab.com/spunnanithi/project-beta

1. Select the Fork option and enter your own username when filling out the information.
2. Select the Clone option and copy the "Clone with HTTPS" key that will be entered into your terminal later.
3. In your terminal, enter `cd` to change into your projects folder.
4. Enter the command `git clone https://gitlab.com/(yourusername)/project-beta`.
5. Enter newly created folder by entering `cd` into the cloned projects folder.
6. Then enter the following commands to create a database, build/start the Docker container:

```sh
docker volume create beta-data
docker-compose build
docker-compose up
```

7. Once you have completed those steps you will be able to render the webpage using
   http://localhost:3000/ with 3000 being the port used.

---

## Inventory Microservice

### Front-End

#### Navigation Links

The React navigation bar features a dedicated "Inventory" navigation link that will take the user to the page with the various links for Manufacturer, Vehicle Model, and Automobile.

#### Manufacturer, Vehicle Model, Automobile Forms

The Manufacturer, Vehicle Model, Automobile Forms each allow a user to create an instance of each respective model. Once the form is submitted, the form data is converted into JSON and sent using a _POST_ HTTP request to the appropriate URL. For the Vehicle Model and Automobile Forms, there are dropdown menus that is populated with either the manufacturer for Vehicle Model or model for the Automobile. The user may choose from the exisiting instances of each respective dropdown menu.

#### Manufacturer, Vehicle Model, Automobile List

The Manufacturer, Vehicle Model, and Automobile List pages allow the user to see a list of instances of each respective Django model.

### Back-End

#### Models

**Manufacturer (Value Object)** - The Manufacturer model is considered a value object within this bounded context since it has no life cycle or unique identity. A manufacturer instance such as "Ford" cannot be distinguished with another manufacturer instance named "Ford". Therefore, we are only interested with the value this model possesses and not the properties and identity of this model.

**Vehicle Model (Value Object)** - The Vehicle Model model is considered a value object within this bounded context since it has no life cycle or unique identity. Similar to the Manufacturer model, the Vehicle Model model aims to be utilized for its values.

**Automobile (Entity)** - The Automobile model is considered an entity within this bounded context since it has a unique identity. Automobiles can be distinguished by comparing VIN numbers. Since VIN numbers are unique to that specific automobile, that automobile can be identified from other automobiles.

### RESTful API CRUD Routes

In your Insomnia you will be able to use these steps to test all functionality

### Manufacturer

- To create a manufacturer use a Post method request to http://localhost:8100/api/manufacturers/

This is an example of JSON body to use

```js
{
  "name": "Chrysler"
}
```

(Upon successful creation it will show information like below)

```js
{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Chrysler"
}
```

- To view a list of manufacturers using a GET method request to http://localhost:8100/api/manufacturers/

It will return information as shown in this example:

```js
{
  "manufacturers": [
	{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Chrysler"
	}
  ]
}
```

- To get a specific manufacturers detail use a GET method request to http://localhost:8100/api/manufacturers/:id/ using the id as shown above in the :id which would be 1. this is an example of what you would see below.

```js
{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Chrysler"
}
```

- To update a specific manufacturer use a POST method request to http://localhost:8100/api/manufacturers/:id/
  using the id in the url the same as above.

This is the JSON body and only the name information is needed

```js
{
  "name": "Chrysler"
}
```

- To delete a specific manufacturer use a DELETE method request to http://localhost:8100/api/manufacturers/:id/
  using the id. When successfully deleted the manufacturer will be removed from the list view and the database.

Example of the id to be used, which would be 1 in this case.

```js
{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Chrysler"
}
```

### Vehicle

- To create a vehicle you first need to have created a manufacturer. you then can send a POST request to http://localhost:8100/api/models/
  it requires the manufacturer id and a picture url.

Here is an example of the JSON body

```js
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer_id": 1
}
```

(After successful creation you will see shown below)

```js
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Daimler-Chrysler"
  }
}
```

-To view a list of all vehicles send a GET request to http://localhost:8100/api/models/
and example below of what you will see.

```js
{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
      }
    }
  ]
}
```

- To view a specific vehicle details you use a GET request to http://localhost:8100/api/models/:id/
  use use the id in the models which as shown in the example above would be 1.
  This is an example of what you will see.

```js
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Daimler-Chrysler"
  }
}
```

- To update a specific vehicle you use a PUT request to http://localhost:8100/api/models/:id/
  referencing id of the model as done in view details. Updating a vehicle can take either name or a picture url.
  example of the JSON body.

```js
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
}
```

- To delete you use the DELETE method request to http://localhost:8100/api/models/:id/
  referencing the id of model. You would use the model id which is below the href in example below.
  When successfully deleted the vehicle will be removed from the list view and database.

```js
{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
      }
    }
  ]
}
```

### Automobile

- To create automobile you need to have created a manufacturer and vehicle first. Then send a POST method request to http://localhost:8100/api/automobiles/
  you will need the model id to use in the JSON body when creating.
  Example of JSON body to use.

```js
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```

(and you will see this upon successful creation)

```js
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "yellow",
  "year": 2013,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  }
}
```

- To view a list of all automobiles use a GET method to http://localhost:8100/api/automobiles/
  below is an example of what will show after the GET.

```js
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "yellow",
  "year": 2013,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  }
}
```

- To view the specific details of an automobile you send a GET method request to http://localhost:8100/api/automobiles/:vin/
  however unlike in the manufacturer and vehicle we use the vin in the url, which can be found using the list all automobiles.
  Example of the url with vin added http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/ and an example of the GET result.

```js
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "yellow",
  "year": 2013,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  }
}
```

- To update a specific automobile use a PUT method request to http://localhost:8100/api/automobiles/:vin/
  using the vin again in the url. Here is an example of using vin http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/
  and when updating you can change the color or year.
  Example of JSON body.

```js
{
  "color": "red",
  "year": 2012
}
```

- To delete a specific automobile use the DELETE method request to http://localhost:8100/api/automobiles/:vin/ and use the vin in the url.
  Here is an example of the url with vin http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/
  when successfully deleted you will see that the automobile has been removed from the list and database.
  Example of where to find the vin, you can view the list and take the href with the vin or the vin for the url.

```js
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "yellow",
  "year": 2013,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  }
}
```

---

## Service Microservice

### Front-End

#### Navigation Links

The React navigation bar features a dedicated "Service" dropdown menu to access the various links to create a technician, create a service appointment, view service appointment and view service appointment history by VIN.

#### Technician Form

The Technician Form page allows the user to create a technician by inputting the technician name and employee number in a form. Once the form is submitted, the form data will be converted to JSON and sent using a _POST_ HTTP request to the appropriate URL.

> Please see "Create view of technician" in the _**RESTful API CRUD Routes**_ section below for routing details.

#### Service Appointment Form

The Service Appointment Form page allows the user to create a service appointment by inputting the customer name, VIN, date/time, reason for service appointment and technician in a form. Once the form is submitted, the form data will be converted to JSON and sent using a _POST_ HTTP request to the appropriate URL.

> Please see "Create view of appointment" in the _**RESTful API CRUD Routes**_ section below for routing details.

#### Service Appointments List

The Service Appointment List page features a table that will list out all of the appointments that are currently not finished or canceled. The user is able to see if each respective customer/appointment/automobile is a VIP on the far-left side of the table. **_A yellow star indicates the customer is a VIP while a red 'X' indicates the customer is not a VIP._** Also, the user is able to click on the 'Finish' or 'Cancel' buttons to remove the appointment from the listing. The appointment will still be available in the database for the Appointment model but it will no longer get shown in the table.

> Please refer to "AutomobileVO (Value Object)" in the Models section below for more VIP information.

#### Service Appointment History by VIN

The Service Appointment History page features a search bar at the top of the page where the user can input a valid VIN to list out a history of appointment(s) for the related automobile. Only the associated automobile with the VIN will populate the table underneath the search bar.

### Back-End

#### Models

**Appointment (Entity)** - The Appointment model is considered an entity since it has a life cycle (active, canceled or finished) and its own unique identity. An appointment instance has its own unique properties such as VIN, customer name, date/time, reason for appointment and technician assigned to each appointment instance. Additionally, the Appointment model contains a property to keep track of the finished or canceled status of each appointment instance.

**Technician (Entity)** - The Technician model is considered an entity since it has its own unique identity. Two technicians both named "Ryan" are considered two different entities and can be identified using their employee number.

**AutomobileVO (Value Object)** - The AutomobileVO model is considered a value object since AutomobileVO instances have no identity or life cycles. Additionally, the data within AutomobileVO model should not be updated or deleted in any way. The data stored within this model is used to determine if the customer is considered a VIP.

> A customer is considered a VIP if the automobile VIN used while booking a service appointment matches the VIN from any automobile that is present in the Inventory microservice.

#### Polling

The Service microservice polls the Inventory microservice every 15 seconds to obtain Automobile model data and stores the data under the AutomobileVO model in the Service microservice.

> A _GET_ HTTP request was made to http://inventory-api:8000/api/automobiles/ to poll for Automobile data from Inventory microservice.

<br/>

### RESTful API CRUD Routes

> The appropriate RESTful API HTTP endpoints, used to view, create, update and delete, are listed below that will interact with the Appointment, Technician and AutomobileVO models, accordingly. These endpoints can be accessed using Insomnia or Insomnia-equilvalent application.

#### Appointments

**List view of appointments**

Send _GET_ request to http://localhost:8080/api/appointments/ <br/>

Sample return JSON response data:<br/>

```json
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

```json
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

```json
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

```json
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

```json
{
	"customer_name": "Ryan",
	"reason": "Check engine light diagnosis",
	"technician": 2,
	"is_finished": true,
	"is_vip": false
}
```

> `{"is_finished": false}` can be manually passed into the JSON request body to make it appear in the React Appointment Listing after clicking "Finished" or "Canceled".

Sample return JSON response after updating individual appointment:

```json
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

```json
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

```json
{
	"message": "Does not exist"
}
```

<br/>

#### Technicians

**List view of technicians**

Send _GET_ request to http://localhost:8080/api/technicians/<br/>

Sample return JSON response data: <br/>

```json
{
	"technicians": [
		{
			"id": 1,
			"name": "RieRie",
			"employee_number": 193428
		},
		{
			"id": 2,
			"name": "Robert",
			"employee_number": 391032
		}
	]
}
```

<br/>

**Create view of technician**

Send _POST_ request to http://localhost:8080/api/technicians/<br/>

Sample JSON request object to create a technician:<br/>

```json
{
	"name": "Robert",
	"employee_number": "391032"
}
```

Sample return JSON response after sending POST request:<br/>

```json
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

```json
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

```json
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

The sales microservice is responsible for handling the creation of customers and our sales reps. Also providing lists of all sales with the ability to see the information of which sales rep made the sale. With a status for when cars have been sold or are still available for purchase. And to create sales with a customer, automobile, price, and sales rep. There are multiple foreign keys used to connect all of this information together in order for all our applications to work. We created multiple view functions to list, view, and create by using the GET, DELETE, and POST methods. We also implemented a poller in our poller.py file to connect our inventory with our sale microservice using our automobileVO model.

Explain your models and integration with the inventory
microservice, here.

### The four Microservice models:

1. AutomobileVO:
   We use this model to deal with integrating the inventory microservice by implementing a value object using "vin" as the unique property. by using "vin" we are able to pull individual values of "automobile" from our inventory microservice. This makes it possible to use foreign key relationships between our sales history and automobile from inventory. in order to do all of this we created a pll function that is linked to the inventory microservice.

2. Customer:
   This model used the properties of name, address, and phone number to create a potential customer. Which is then used with our sales history.

3. SalesRep:
   The model used the properties of name and employee id, which is then used with our sales history.

4. SalesRecord:
   This model enabled the creation of a sales record using the other three models via a foreign key relationship. Then the price property was added.

### MY NAMING CONVENTIONS FOR THIS PROJECT:

SalesRecordForm = Create a sale with customer, automobile, sales rep, and the price.

SalesRepHistory = Allows a drop down bar to select a specific sales rep and their sales history.

SalesList = A list with all all of the automobiles sold and information for sales rep, their employee id, the customer, vin, the sale price and a delete button.

SalesRepForm = (has the link title of "Add New Sales Rep") which has two input fields for name and employee id (which is a number).

CustomerForm = (has a link title of "Add New Customer") which has three input fields for name, address, and phone number.

### SALES MICROSERVICE PORT:8090

### CRUD:

### SALES INSOMNIA URLS:

http://localhost:8090/api/salesrep/ (for the sale reps list and to create a new sales rep)

http://localhost:8090/api/salesrep/<int:id>/ (for the sales rep information)

http://localhost:8090/api/salesrep/<int:id>/record/ (for the sale records of individual employees)

http://localhost:8090/api/sale/ (for the sales list and to create a sale)

http://localhost:8090/api/sale/<int:id>/ (for the sale details and to delete a sale)

### CUSTOMER INSOMNIA URLS:

http://localhost:8090/api/customer/ for the customer list and to create a customer

http://localhost:8090/api/customer/<int:id>/ for customer details

_when testing using insomnia the (task) corresponds with the link used_

### TESTING CUSTOMER ASPECT:

- Test creating a customer here is the JSON body to use with a POST method.

```js
{
"name": "Peter Parker",
"address": "20 ingram st, Queens, NY",
"phone": "123-456-7890",
}
```

(you will then be returned a "customer" array with name, address, phone, id below is an example of what the result will look like)

- View the customer details you will need to add the id # into <int:id> using a GET method.

here is an example of how to do this:

```js
{
"name": "Peter Parker",
"address": "20 ingram st, Queens, NY",
"phone": "123-456-7890",
"id": 3
}
```

after creating your customer you will have a unique id linked to their information. You will see that as 3 in the example above. you then replace the <int:id> with that id number, like shown below.

http://localhost:8090/api/customer/3/

(this will then return the individual customers information of name, address, phone number and unique id)

### TESTING SALES ASPECT:

- Test creating a sales rep, here is the JSON body to use with a POST method.

```js
{
"name": "test Rep 4",
"employee_id": 4
}
```

(you will then be returned a "salesrep" array with name, employee, and a unique id # shown below)

```js
{
	"salesrep": {
		"name": "test Rep 4",
		"employee_id": 4,
		"id": 4
	}
}
```

- Test the creation of a automobile sale, here is the JSON body to use. You will need to use a POST method.(In order to create a sale a customer, automobile and sales rep must already be created)

```js
{
"customer" : "Joe Dirt",
"automobile" : "12345678912345678", (vin number here)
"sales_rep": 1, (sale rep employee number)
"price" : 50000
}
```

(you will then be returned information for the sales rep, the customer, and automobile. which can also be viewed via sales list or sale detail shown below)

```js
{
	"sales_rep": {
		"name": "Ron Burgundy",
		"employee_id": 5,
		"id": 5
	},
	"customer": {
		"name": "Peter Parker",
		"address": "20 ingram st, Queens, NY",
		"phone": "123-456-7890",
		"id": 3
	},
	"automobile": {
		"year": 2023,
		"import_href": "/api/automobiles/24689283475689/",
		"color": "Black",
		"vin": "24689283475689",
		"sold": true,
		"id": 6
	},
	"price": 50000,
	"id": 42
}

```

- View an individual sales rep sales history you will need to use the GET method and add the employee_id into the <int:id> of the url. To test this you need to complete the steps above and created a successful sale.

```js
{
"name": "Ron Burgundy",
"employee_id": 5,
"id": 5
}
```

(the result will be similar to below)

```js
{
	"sales_rep": {
		"name": "Ron Burgundy",
		"employee_id": 5,
		"id": 5
	},
	"customer": {
		"name": "Peter Parker",
		"address": "20 ingram st, Queens, NY",
		"phone": "123-456-7890",
		"id": 3
	},
	"automobile": {
		"year": 2023,
		"import_href": "/api/automobiles/24689283475689/",
		"color": "Black",
		"vin": "24689283475689",
		"sold": true,
		"id": 6
	},
	"price": 50000,
	"id": 42
}
```

below is an example of using the employee_id in the url for insomnia

http://localhost:8090/api/salesrep/5/record/

(this will return a "sales" array with all sales_rep, customer, and automobile information. including a sold status of True)

-View individual sales rep info is similar as the above process using Get method with an employee_id, you input their number into the url <int:id> in insomnia as shown in example below.

http://localhost:8090/api/salesrep/5/

(This will return the sales_rep name, employee_id, and id)

-View specific details of an automobile sale using GET method, you will need to locate the id below the price and then input that id in the url <int:id> in insomnia. You can find this id information by looking at the sales list url which will provide the id needed. Below is an example of implementing this.

```js
{
"automobile": {
"year": 2023,
"import_href": "/api/automobiles/24689283475689/",
"color": "Black",
"vin": "24689283475689",
"sold": true,
"id": 6
},
"price": 50000,
"id": 42
}
```

http://localhost:8090/api/sale/42/

(this will return all the information involved with the automobile sale. Customer,sales_rep, automobile and price)

-Delete a sale is the same as the steps above using DELETE method in insomnia and implementing the use of ID in the same way.

### FRONT-END WITH REACT:

1. Create customer => CustomerForm.js => (browser link) Add New Customer
   http://localhost:3000/sales/customer => url

2. Create sales rep => SalesRepForm.js => (browser link) Add New Sales Rep
   http://localhost:3000/sales/salesrep => url

3. Full sales list => SalesList.js => (browser link) Sales List
   http://localhost:3000/sales => url

4. Create sale => SalesRecordForm.js => (browser link) Record A New Sale
   http://localhost:3000/sales/new =>

5. Sales rep sale record => SalesRepHistory.js => (browser Link) Sales Rep History
   http://localhost:3000/sales/sales-history => url

6. This renders a form that requires three inputs which are name, address, and phone number. Once you click the submit button the customer is created and their information added to the database. The page then refreshes and is ready for another customers information.

7. This renders a form that requires two inputs which are name and employee ID. once you click the submit button the new sales rep is created and their information added to the database. The page then refreshes and is ready for another customers information.

8. This renders a list of all automobiles sold with the information for the sales rep who made the sale, their employee id, the customer who made the purchase, the VIN related to the vehicle, the sale price, and a delete button to remove any sales from the list.

9. this renders a form that requires four inputs that creates a new sale of an automobile. It uses a drop down bar for the automobile, the sales rep, and to choose a customer with all this information on the database. The automobiles are only the ones that have not been sold and are available for purchase. The last input is for the price of the automobile being sold and once the submit button is hit all the information is added to the database. And then can be viewed on the sales list and the sale reps history.

10. this renders a table with headers of sales representative, customer, vin, and price. In order for the table data to populate we need to select a sales reps by using the drop down bar that says "Choose A sales Representative". You can select different sales reps and the page will repopulate according to your selection.
