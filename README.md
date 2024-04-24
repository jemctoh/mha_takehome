# mha_takehome
 
Backend API with 3 endpoints -- DONE

1. GET object by ID (from list of JSON objs)
2. Add new object
3. Delete an object

Request Logger -- DONE

Validate requests to add and del objects based on fields -- DONE

Unit tests to test the endpoints -- DONE

Implement any dependency injection -- DONE

Deploy to cloud -- DONE

========================= DESIGN ===========================

object chosen: 

    pets(id, name, animal, color)

Chose Hapi.js and Swagger as it provides clear API Documentation.

Unit Test using Jest.

Dependency Injection
--> created a pet store service that handles the data in the json file.
--> this reduced the number of imports made in the routes, and allowed the logic to be abstracted and can reduce complexity when writing new routes in future.

========== Running on local ==========

1. with nodejs

> npm install

> npm start

go to localhost:3000/documentation to view swagger ui

to test, 
> npm test

2. with docker

> chmod +x run.sh

> ./run.sh

=========== Cloud Deployment ============

Bought a small VM on Google Cloud Platform using free student credits.

Copied docker image (.tar file) to VM.
Run it using docker.
Configure Firewall Rules.

The page is accessible on http://34.16.137.76:3000/documentation .

