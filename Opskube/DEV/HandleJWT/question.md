FashionFiesta is an e-commerce platform that allows users to purchase clothing and accessories online. The company wants to implement a secure login system for its users. As a MERN stack developer, you are tasked with creating an API for user login and generating a token when a user is logged in successfully. The token should expire after 1 hour.

You are given the following database schema:

users table

Column Name	Data Type
id	int
username	varchar(50)
password	varchar(255)

You need to create an API endpoint that accepts a username and password as input, verifies the credentials, and generates a token upon successful login. The token should expire after 1 hour.

Please write the necessary code to create this API endpoint using Node.js, Express.js.

Note: You can use any suitable JWT library or uuid.

// Example code stub
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.post('/login', (req, res) => {
  // Write your code here
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
Implement the /login API endpoint to generate a JWT token upon successful login.