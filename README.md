Community Concerns Backend
Node / Express / Knex

ENDPOINTS
Login/Register endpoints
----------------------------------
API hosted at: https://community-concerns.herokuapp.com/
### User Endpoints 
| Method | Endpoint           | Description                             | Requirements
| ------ | ------------------ | ----------------------------------------|--------------------------------------
| POST   | /api/auth/register | Allows users to register an account     | email, username, zipcode, password
| POST   | /api/auth/login    | Logs in user and sends JSON token       | email, password
| DELETE | /api/auth/:id      | Delete a users account                  | url includes the users id
 

# ALL LOGGED IN ENDPOINTS REQUESTS MUST INCLUDE JSON TOKEN RECIEVED DURING LOGIN IN HEADER AS PROPERTY authorization
Tickets CRUD
------------------------
API hosted at: https://community-concerns.herokuapp.com/
### Ticket Endpoints 
| Method | Endpoint                | Description                        | Requirements
| ------ | ----------------------  | -----------------------------------|-------------------
| GET    | /api/tickets            | Get all tickets in database        | Valid JSON Token in header of request
| GET    | /api/tickets/my_tickets | Get the tickets of logged in user  | Valid JSON Token in header of request
| POST   | /api/tickets            | Add a new ticket                   | title, description, zipcode in body, (image can also be included in body but not required) Valid JSON Token in header of request
| PUT    | /api/tickets/:id        | Update a ticket                    | any changes in body, ticket ID in request url, Valid JSON Token in header of request
| DELETE | /api/tickets/:id        | Delete an ticket                   | id of ticket to be deleted in URL, Valid JSOn token in header of request

Comments CRUD
------------------------
API hosted at: https://community-concerns.herokuapp.com/
### Comments Endpoints 
| Method | Endpoint                 | Description                       | Requirements
| ------ | ----------------------   | ----------------------------------|-------------------
| GET    | /api/comments/:id        | Get all comments of a ticket      | id of ticket you want to get comments for in request url, Valid JSON Token in header of request
| POST   | /api/comments/:id        | Add a new comment to a ticket     | comment in body, id of ticket you are creating the comment for in request url, Valid JSON Token in header of request
| PUT    | /api/comments/:id        | Edit a specific comment           | changes(comment) in body, id of comment to be changes in request url, Valid JSON Token in header of request
| DELETE | /api/comments/:id        | Delete specific comment           | id of comment to be deleted in request url

Upvotes CRUD
------------------------
API hosted at: https://community-concerns.herokuapp.com/
### Upvotes Endpoints 
| Method | Endpoint                      | Description                                 | Requirements
| ------ | ---------------------------   | --------------------------------------------|-------------------
| GET    | /api/upvotes                  | Get all upvotes in database                 | Valid JSON Token in header of request
| GET    | /api/upvotes/my_upvotes       | Get all upvotes for a specific user         | Valid JSON Token in header of request 
| POST   | /api/upvotes                  | Create an upvote                            | ticket_id in body, Valid JSON Token in header of request
| DELETE | /api/upvotes/:id              | Delete an upvote                            | id of upvote in request url, Valid JSON Token in header of request