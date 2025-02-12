// import required modules
const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");

// create dotenv config

dotenv.config({
  path: "./.env",
});

// create connection

const db = mysql.createConnection({
  host: process.env.database_host,
  user: process.env.database_user,
  password: process.env.database_pass,
  database: process.env.database,
});

// Check if database credentials are missing
if (!process.env.database_host || !process.env.database_user || !process.env.database_pass || !process.env.database) {
  console.error("Missing database environment variables!");
  process.exit(1);  // Stop execution if database credentials are missing
}

// Connect to MySQL database

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err.message);
    process.exit(1);  // Exit the app if DB connection fails
  }
  console.log("MySQL connection is Success!");
});

//initialize express application
const app = express();

//for parsing the data from the form
app.use(express.urlencoded({extended:false}))

//for connecting static files
app.use(express.static(path.join(__dirname, "public")));

//set the view engine
app.set("view engine", "hbs");

//set the views path
app.use("/", require('./routes/pages'))
app.use("/auth", require('./routes/auth'))

//create a route for the homepage
app.listen(5000, () => {
  console.log("Server is running at Port: 5000");
});

