#Book Management Application

A full-stack application for managing books with Spring boot backend and React frontend.

##Table of Contents
-[Prerequisites](#prerequisites)
-[Backend Setup(Spring Boot)] (#backend-setup-spring-boot)
-[Database Setup] (#database-setup)
-[Fronteend Setup (React)] (#frontend-setup-react)
-[Running the Application](#running-the-application)
-[API Endpoints](#api-endpoints)
-[Assumptions](#assumptions)
-[Known Issues](#known-issues)

##Prerwquisites
-Java 21
-Maven 3.6.3 or higher
-Node.js 16.x or higher
-npm 8.x or higher
-MySQL

##Backend Setup (Spring Boot)
1. Create application using Spring initializer, add dependencies:
-Spring Web
-Spring Data JPA
-MySql Driver
-Spring Security

2. configure database connection `application.properties`: ``` properties
spring.datasource.url=jdbc:mysql://localhost:3306/booktracker
spring.datasource.username=root
spring.datasource.password=magic123
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

3. Build application: mvn clean install
4. Run the application : mvn spring-boot:run

##Databse Setup (MySQL)
1. create a new database: CREATE DATABASE booktracker;
2. the application will automatically create tables on startup with: spring.jpa.hibernate.ddl-auto=update

##Frontend Setup (React)
1. Create application using cmd with: npx create-react-app my-react-app
2.install dependencies: npm install
3.configure the backend API URL
4.run the development server: npm start

##Running the Application
1. Start the MySQL service
2. Run the spring Boot application (backend)
3. Run the React application(Frontend)
4.Access the application at http://localhost:3000

##Assumptions
1. The applivation assumes MySQL as the default database but can be configures for PostgreSQL
2. Date is assumed to be YYY_MM_DD
3. Frontend expects backend to be running on port 8080
4. All book fileds(title, author, published date, gere) are required
5.Basic error handling is implemented for API calls

##Known Issues
1. Date picker in the form might show inconsistent formatting in some browsers
2. No advance search capabilities beyond simple text search
3. no user authentication implemented
4. pagination might show inconsistent benavioue with excatly 5 books
5. No input validation for special charecters in book fields

##API Endpoints
1. GET http://localhost:8080/api/books
2. GET http://localhost:8080/api/books/{id}
3. POST http://localhost:8080/api/books
4. PUT http://localhost:8080/api/books/{id}
5. DELETE http://localhost:8080/api/books/{id}

