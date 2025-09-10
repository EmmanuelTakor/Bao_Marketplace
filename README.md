#Bao MarketPlace - Backend (Express + PostgreSQL)

This project is a backend API for a simple online marketplace. It provides secure user registration and login, product CRUD operations, and a public product listing with search and pagination.
Built with:
Node.js & Express – backend routing
PostgreSQL – database via Sequelize ORM
JWT & bcrypt – authentication and password hashing
Joi – request validation
Docker – deployment and reproducibility
Swagger – API documentation



#Features
   Secure User Registration & Login with bcrypt & JWT

   Product CRUD: users can create, update, delete, and view their own products

   Public Product Listing with search & pagination

   PostgreSQL database with Sequelize ORM

   Centralized error handling & input validation (Joi)

   Swagger API docs available at /docs

   Docker support for easy deployment

   Basic tests included



#Tech Stack


Backend: Node.js, Express.js
Database: PostgreSQL + Sequelize
Auth: JWT + bcrypt
Validation: Joi
Docs: Swagger (swagger-jsdoc + swagger-ui-express)
Deployment: Docker, Docker Compose

#Installation

1. Install Prerequisites

      Docker
      Docker Compose
      Git

2. Clone the Repository

      git clone https://github.com/EmmanuelTakor/Bao_Marketplace.git
      cd Bao-Marketplace

3. Install dependencies:
      npm install

4. Set up Environment Variables
      Copy the example environment file by using the command below:
      cp .env.example .env
      Open .env and ensure the following are set with the neccesary values:
         PORT=
         DATABASE_URL=
         JWT_SECRET=
         JWT_EXPIRES_IN=

5. Build and Start Docker Containers
      Run the following command to build the containers and start the app:
         docker-compose up --build
         This will:
            Pull and run a PostgreSQL container for the database (db service).
            Build and run the backend app container (app service).
6. Verify Containers are Running
      In another terminal, check running containers using the command below:
      docker ps
      You should see at least two containers:

         baomarketplace-app-1
         baomarketplace-db-1

7. Access the Application
The backend API will be accessible at:
   http://localhost:3000
Swagger documentation for API endpoints will be available at:
   http://localhost:3000/docs

8. Interact with the API


   1. Authentication
Method	                           Route	                                                                     Description
POST	                           /api/auth/register	                                                   Register a new user
POST	                           /api/auth/login	                                                      Login and receive JWT

Register a User Example (POST /api/auth/register with JSON payload):
{
  "email": "user@example.com",
  "password": "strongpassword123",
  "fullName": "John Doe"
}

Login Example (POST /api/auth/login with same credentials, receive accessToken):
{
  "email": "user@example.com",
  "password": "strongpassword123"
}

   2. Products
N.B on routes that "Auth" is set to true you would need jwt token to access. On such authenticated endpoints
Include token in Authorization header i.e Authorization: Bearer <accessToken>

Method	                        Route	                            Auth	                                       Description
GET	                   /api/products/public	                     No	                        Public list of products (search & pagination)
GET	                   /api/products/:id	                        No	                        Get product by ID
POST	                   /api/products	                              Yes	                     Create product (images array optional)
GET	                   /api/products/me	                           Yes	                     Get products of authenticated user
PUT	                   /api/products/:id	                        Yes	                     Update product (owner only)
DELETE	               /api/products/:id	                           Yes	                     Delete product (owner only)



Pagination Example:
   GET /api/products/public?page=2&per_page=10&q=test

Testing
   Run tests using Jest & Supertest:
      npm test

9. 8. Stop Containers
   When done, stop the containers:
      docker-compose down


#Trade Offs and Design Decisions

1. I chose to use PosgreSQL over Mongo DB . 
      For a marketplace platform application, the choice between PostgreSQL with a relational ORM like Sequelize and a NoSQL database like MongoDB is a critical architectural decision. I went with PosgreSQL because ,firstly, it ensures better data integrity and relationships for this particular scenario. PostgreSQL is ACID (Atomicity, Consistency, Isolation, Durability) compliant by default. This is non-negotiable for a marketplace where financial transactions, order statuses, and inventory counts must be absolutely reliable. It ensures that a transaction is either completed entirely or not at all, preventing partial updates that could lead to financial inconsistencies. MongoDB offers weaker consistency guarantees that can be problematic for this kind of application. Equally PosgreSQL offers more Structured Data and Schema Enforcement: A marketplace has a clearly defined structure: products have owners, orders have customers and items, and payments are linked to orders. PostgreSQL's relational model excels at managing these complex, well-defined relationships. Sequelize enforces this schema at the application level, catching data inconsistencies and errors before they reach the database. MongoDB's flexible schema can become a liability, leading to inconsistent data structures across documents over time.

2. Posgre + Sequelize instead of just Posgre as demanded by your stipulations.
      I chose this approach, 
      firstly, for Enhanced Security.Using an ORM(Object Relational Mapping) is one of the most effective ways to prevent a common and dangerous vulnerability: SQL injection attacks. When we manually build queries by concatenating strings, we risk a malicious user inputting code that manipulates our database.Sequelize automatically handles this by using prepared statements and parameterized queries. It sanitizes all input, ensuring that data is treated as values and not executable code. This is a crucial security benefit that we get out of the box without needing to implement any custom security logic.
      
      Secondly, I chose this approach inorder to enhance Abstraction and Maintainability.With ORMs like Sequelize, instead of writing raw SQL in JavaScript code, we interact with the database using JavaScript objects and methods. This leads to cleaner, more readable code that's easier to maintain. Moreso, Sequelize equally offers a robust Schema and Migration Management. In any non-trivial application, database schema will evolve. Sequelize provides a powerful command-line interface (CLI) to manage database migrations. 

3. JWT + bcrypt instead of just JWT as stipulated by your requirements.
      I chose this approach because while JWT offers great security measure with tokens, if i were to use just it in an application where users have to register and log in (which implies that their passwords have to be stored in the database), I would be storing the passwords of users directly in the database - which is a serious security flaw that can be exploited by hackers and malicious actors. All such a person needs to access the space of any user is to have access somehow into the database. With bycrypt, hashing algorithms are used to encrypt the passwords of using before database storage thereby offeering an aditional critical layer of security. This way even if the database is hacked or accessed by an ill-intentioned person, they wont still know the user's password.



4. Joi Validation. I added the Joi utility to the stipulations you gave to ensure Strict payload validation before database interaction. Enforcing Data Integrity and Reliability. The primary purpose of validation is to ensure data integrity. By defining a schema with Joi, we create an explicit contract for the data that enters our application. This prevents a cascade of potential issues later on, such as: Bugs and Crashes: If our code for instance expects a number but receives a string, it can lead to unexpected type errors and application crashes. Joi catches these issues at the very beginning of the request lifecycle. It equally drastically improves Code Clarity and Maintainability. Without a library, validation logic can quickly become a bloated, unreadable mess of nested if statements. This is difficult to debug, update, and understand. Joi's approach is declarative, allowing us to define our validation rules in a clean, readable schema.

5. It wasn't explicitly demanded but I chose to containerize both the database and backend. Firstly, even beyond the fact that this is an industry best practice in such a scenario where code or an application has to be explored by another person on another machine, it ensures Consistency and Environment Isolation , thereby eliminating a very popular problem we developpers often face: the "It Works on My Machine" Syndrome . A container packages our application and all its dependencies (libraries, runtimes, environment variables) into a single, isolated unit. This guarantees that the application will run identically on a colleague's machine as it does on ours, eliminating the common frustrations of mismatched dependencies or OS-specific bugs.

6. Lastly, it wasn't demanded but I equally added the Swagger Docs utility for better documentation and easy API exploration. Accesible on /docs .