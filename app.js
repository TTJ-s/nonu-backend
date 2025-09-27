// Import necessary modules and libraries
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const volleyball = require('volleyball');

// Load environment variables based on the current environment (development or production)
// if (process.env.NODE_ENV === 'development') {
//   dotenv.config({ path: './env/.env.development' }); // ! Load development environment variables
// }
// if (process.env.NODE_ENV === 'production') {
//   dotenv.config({ path: './env/.env.production' }); // ! Load production environment variable
// }

const app = express();
app.use(volleyball);
const serviceAccount = require('./config/serviceFirebaseKey.json');
// Initialize firebase service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
// Import responseMaker utility function for creating consistent API responses
const responseMaker = require('./helpers/responseMaker');
// Import database connection module
require('./helpers/connection');
// Import user route
const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');
const counsellorRoute = require('./routes/counsellor');
// Enable Cross-Origin Resource Sharing (CORS) middleware
app.use(cors());
// Parse JSON request bodies
app.use(express.json());

// Define the API version based on environment variable
const { API_VERSION } = process.env;
// Set the base path for API routes
const BASE_PATH = `/api/${API_VERSION}`;
// Configure routes for user API
app.use(`${BASE_PATH}/user`, userRoute); // ? Define routes for user-related functionality
app.use(`${BASE_PATH}/admin`, adminRoute); // ? Define routes for admin-related functionality
app.use(`${BASE_PATH}/counsellor`, counsellorRoute); // ? Define routes for counsellor-related functionality

// Define a route for the API root
app.get(BASE_PATH, (req, res) =>
  responseMaker(
    res,
    200,
    'All endpoints are 🔐. Do you have the 🔑', // * Send a welcome message for the API root
    null,
    false
  )
);
// Start the server and listen on the specified port from environment variable
app.listen(process.env.PORT, () => {
  /* eslint-disable */
  console.log(`Server is Running on port ${process.env.PORT}`); // ! Log the server's listening port
});
