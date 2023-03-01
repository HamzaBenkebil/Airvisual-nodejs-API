# Airvisual-nodejs-API

This is a simple RESTful API built with Node.js with Express framework, that uses the AirVisual API to display weather data for a specified location.

# Installation:

To use this API, you will need to have Node.js and npm and ExpressJs installed on your machine. You can then install the necessary packages by running the following command in your terminal:
  - npm install
Make sure that you have mysql server installed on your host then you can create a database named : weatherdb

# Usage
To start the API server, run the following command in your terminal:
  - node index.js
To start the Unit tests you can run following command:
  - mocha unit_tests.js

Once the server is running, you can make requests to the API endpoints using the following base URL:
  - GET method on : http://localhost:3000/getWeather?longitude={lon_area}&latitude={lat_area} : Returns the current weather data for the specified area with longitude and latitude.
  
# API Documentation
For more information on how to use the API endpoints and the response format, please see the API documentation https://www.iqair.com/fr/commercial/air-quality-monitors/airvisual-platform/api.

# Credits
This API was built using the AirVisual API to retrieve weather data.
