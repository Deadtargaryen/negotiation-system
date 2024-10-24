# Negotiation System Backend (MongoDB)

## Introduction
This is a backend API for a negotiation system in an eCommerce platform. It uses MongoDB as the database and is built with Node.js and Express.

## Installation Steps

1. Clone the repository or download the project files.
2. Install dependencies:
   ```
   npm install
   ```

3. Ensure you have MongoDB installed and running on your system.
   You can download MongoDB from [here](https://www.mongodb.com/try/download/community).

4. Start the MongoDB server:
   ```
   mongod
   ```

5. Run the server:
   ```
   npm run dev
   ```

The server will run on `http://localhost:5000`.

## Available Endpoints

### Authentication
- **POST** `/auth/register` - Register a new user
- **POST** `/auth/login` - Login with an existing user

### Products
- **GET** `/api/products` - Get a list of products

### Negotiation
- **POST** `/api/start-negotiation` - Start a negotiation for a product
