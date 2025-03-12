# IT3101 Activities  

This repository contains my projects, assignments, and exercises for the IT3101 course.  

## Table of Contents  

- [Activity 1 - Microservices with Database Migrations & GraphQL CRUD](#activity-1---microservices-with-database-migrations--graphql-crud)  

## Activity 1 - Microservices with Database Migrations & GraphQL CRUD  

### Description  

In this activity, I built two microservices—**Users** and **Posts**—each with its own database. The goal was to apply database migrations and set up GraphQL endpoints for CRUD operations.  

### Requirements  

- Create two separate microservices: `users-service` and `posts-service`.  
- Initialize a Node.js project in each folder with necessary dependencies (e.g., Prisma, Apollo Server, SQLite).  
- Configure a Prisma schema for each service:  
  - `users-service`: Defines a `User` model with an `id` and at least two other fields.  
  - `posts-service`: Defines a `Post` model with an `id` and at least two other fields.  
- Apply database migrations to create the databases and tables.  
- Implement a GraphQL server in each microservice using Apollo Server:  
  - Define schema types and CRUD queries/mutations.  
  - Write resolvers to handle CRUD operations using Prisma.  
- Run each service on a different port (e.g., **4001 for Users, 4002 for Posts**).  
- Test all CRUD endpoints using a GraphQL client (e.g., GraphiQL) to ensure proper functionality.  

### Submission  

Includes:  
- Project files for both microservices.  
- A short reflection (3-5 sentences) addressing:  
  - The purpose and benefits of database migrations.  
  - How GraphQL differs from REST for CRUD operations.  
