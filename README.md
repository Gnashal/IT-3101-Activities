# IT3101 Activities

This repository is dedicated to my activities for the IT3101 course. Here, you will find all the projects, assignments, and exercises that I have completed as part of this course.

## Table of Contents

1. [Activity 1](#activity-1)

## Activity 1

**Description:** Activity Instructions: Building Microservices with Database Migrations and GraphQL CRUD Endpoints

For this activity, you will create two microservices—"Users" and "Posts"—each with its own database. You’ll apply database migrations and set up GraphQL endpoints for CRUD operations. Complete the following requirements:

Set up two separate microservices folders: users-service and posts-service.
Initialize a Node.js project in each folder with necessary dependencies (e.g., Prisma, Apollo Server, SQLite).
For each microservice:
Configure a Prisma schema with a model (User for users-service, Post for posts-service) including at least an id and two other fields.
Apply a database migration to create the database and table.
Implement a GraphQL server in each microservice using Apollo Server:
Define a schema with types for the model and queries/mutations for CRUD operations (create, read, update, delete).
Write resolvers to handle all CRUD operations using Prisma.
Run each service on a different port (e.g., 4001 for Users, 4002 for Posts).
Test all CRUD endpoints for both services using a GraphQL client (e.g., GraphiQL):
Verify you can create, read, update, and delete records in each database.
Submit your project files for both microservices and a short reflection (3-5 sentences) answering:
What do database migrations do and why are they useful?
How does GraphQL differ from REST for CRUD operations?.

**Files:**
