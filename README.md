# CarCar

Team:

- Daniel Mitchell - Sales Microservice
- Sirasit Punnanith - Service Microservice

## Design

This is the link to the repo where you will first need to go in order to fork and clone this project.

https://gitlab.com/spunnanithi/project-beta

1. you will select the fork option and enter your own username when filling out the information.
2. you will than select the clone option and copy the information to be entered into your terminal
3. in your terminal you will cd into your projects folder
4. you will enter the command git clone https://gitlab.com/(yourusername)/project-beta
5. you will then cd into the cloned projects folder
6. you then do these commands to create/build/start your container
-docker volume create beta-data
-docker-compose build
-docker-compose up
7. Once you have completed those steps you will be able to render the webpage using
http://localhost:3000/ with 3000 being the port used.







## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

The sales microservice is responsible for handling the creation of customers and our sales reps. Also providing lists of all sales with the ability to see the information of which sales rep made the sale. With a status for when cars have been sold or are still available for purchase. And to create sales with a customer, automobile, price, and sales rep. There are multiple foreign keys used to connect all of this information together in order for all our applications to work. We created multiple view functions to list, view, and create by using the GET, DELETE, and POST methods. We also implemented a poller in our poller.py file to connect our inventory with our sale microservice using our automobileVO model.


Explain your models and integration with the inventory
microservice, here.

The four Microservice models:

1. AutomobileVO:
We use this model to deal with integrating the inventory microservice by implementing a value object using "vin" as the unique property. by using "vin" we are able to pull individual values of "automobile" from our inventory microservice. This makes it possible to use foreign key relationships between our sales history and automobile from inventory. in order to do all of this we created a pll function that is linked to the inventory microservice.

2. Customer:
This model used the properties of name, address, and phone number to create a potential customer. Which is then used with our sales history.

3. SalesRep:
The model used the properties of name and employee id, which is then used with our sales history.

4. SalesRecord:
This model enabled the creation of a sales record using the other three models via a foreign key relationship. Then the price property was added.


MY NAMING CONVENTIONS FOR THIS PROJECT:

SalesRecordForm = Create a sale with customer, automobile, sales rep, and the price.

SalesRepHistory = Allows a drop down bar to select a specific sales rep and their sales history.

SalesList = A list with all all of the automobiles sold and information for sales rep, their employee id, the customer, vin, the sale price and a delete button.

SalesRepForm = (has the link title of "Add New Sales Rep") which has two input fields for name and employee id (which is a number).

CustomerForm = (has a link title of "Add New Customer") which has three input fields for name, address, and phone number.


SALES MICROSERVICE PORT:8090

SALES INSOMNIA URLS:

http://localhost:8090/api/salesrep/ (for the sale reps list and to create a new sales rep)

http://localhost:8090/api/salesrep/<int:id>/ (for the sales rep information)

http://localhost:8090/api/salesrep/<int:id>/record/ (for the sale records of individual employees)

http://localhost:8090/api/sale/ (for the sales list and to create a sale)

http://localhost:8090/api/sale/<int:id>/ (for the sale details and to delete a sale)


CUSTOMER INSOMNIA URLS:

http://localhost:8090/api/customer/ for the customer list and to create a customer
http://localhost:8090/api/customer/<int:id>/ for customer details


 *when testing using insomnia the (task) corresponds with the link used*


TESTING CUSTOMER ASPECT:


- Test creating a customer here is the JSON body to use with a POST method.

{
    "name": "Peter Parker",
    "address": "20 ingram st, Queens, NY",
    "phone": "123-456-7890",
}

(you will then be returned a "customer" array with name, address, phone, id)

- View the customer details you will need to add the id # into <int:id> using a GET method.

here is an example of how to do this:
{
    "name": "Peter Parker",
    "address": "20 ingram st, Queens, NY",
    "phone": "123-456-7890",
    "id": 3
}

after creating your customer you will have a unique id linked to their information. You will see that as 3 in the example above. you then replace the <int:id> with that id number, like shown below.

http://localhost:8090/api/customer/3/

(this will then return the individual customers information of name, address, phone number and unique id)


TESTING SALES ASPECT:


- Test creating a sales rep, here is the JSON body to use with a POST method.

{
	"name": "test Rep 4",
	"employee_id": 4
}

(you will then be returned a "salesrep" array with name, employee, and a unique id #)


- Test the creation of a automobile sale, here is the JSON body to use. You will need to use a POST method.(In order to create a sale a customer, automobile and sales rep must already be created)

{
	"customer" : "Joe Dirt",
	"automobile" : "12345678912345678", (vin number here)
	"sales_rep": 1, (sale rep employee number)
	"price" : 50000
}

(you will then be returned information for the sales rep, the customer, and automobile. which can also be viewed via sales list or sale detail)


- View an individual sales rep sales history you will need to use the GET method and add the employee_id into the <int:id> of the url. To test this you need to complete the steps above and created a successful sale.

{
    "name": "Ron Burgundy",
    "employee_id": 5,
    "id": 5
}

below is an example of using the employee_id in the url for insomnia

http://localhost:8090/api/salesrep/5/record/

(this will return a "sales" array with all sales_rep, customer, and automobile information. including a sold status of True)

-View individual sales rep info is similar as the above process using Get method with an employee_id, you input their number into the url <int:id> in insomnia as shown in example below.

http://localhost:8090/api/salesrep/5/

(This will return the sales_rep name, employee_id, and id)

-View specific details of an automobile sale using GET method, you will need to locate the id below the price and then input that id in the url <int:id> in insomnia. You can find this id information by looking at the sales list url which will provide the id needed. Below is an example of implementing this.

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

http://localhost:8090/api/sale/42/

(this will return all the information involved with the automobile sale. Customer,sales_rep, automobile and price)

-Delete a sale is the same as the steps above using DELETE method in insomnia and implementing the use of ID in the same way.


FRONT-END WITH REACT:

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


1. This renders a form that requires three inputs which are name, address, and phone number. Once you click the submit button the customer is created and their information added to the database. The page then refreshes and is ready for another customers information.


2. This renders a form that requires two inputs which are name and employee ID. once you click the submit button the new sales rep is created and their information added to the database. The page then refreshes and is ready for another customers information.


3. This renders a list of all automobiles sold with the information for the sales rep who made the sale, their employee id, the customer who made the purchase, the VIN related to the vehicle, the sale price, and a delete button to remove any sales from the list.


4. this renders a form that requires four inputs that creates a new sale of an automobile. It uses a drop down bar for the automobile, the sales rep, and to choose a customer with all this information on the database. The automobiles are only the ones that have not been sold and are available for purchase. The last input is for the price of the automobile being sold and once the submit button is hit all the information is added to the database. And then can be viewed on the sales list and the sale reps history.


5. this renders a table with headers of sales representative, customer, vin, and price. In order for the table data to populate we need to select a sales reps by using the drop down bar that says "Choose A sales Representative". You can select different sales reps and the page will  repopulate according to your selection.
