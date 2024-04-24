# mha_takehome
 
Backend API with 3 endpoints -- DONE

1. GET object by ID (from list of JSON objs)
2. Add new object
3. Delete an object

Request Logger -- DONE

Validate requests to add and del objects based on fields -- DONE

Unit tests to test the endpoints -- DONE

Implement any dependency injection -- DONE

Deploy to cloud 

========================= DESIGN ===========================

object chosen: 

    pets(id, name, animal, color)

Chose Hapi.js and Swagger as it provides clear API Documentation.

Unit Test using Jest.

Dependency Injection
--> created a pet store service that handles the data in the json file.
--> this reduced the number of imports made in the routes, and allowed the logic to be abstracted and can reduce complexity when writing new routes in future.
