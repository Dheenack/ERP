const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");

dotenv.config({
  path: "./.env",
});

const db = mysql.createConnection({
  host: process.env.database_host,
  user: process.env.database_user,
  password: process.env.database_pass,
  database: process.env.database,
});

db.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("MySQL connection is Success!");
  }
});

const app = express();

app.use(express.urlencoded({extended:false}))

const location = path.join(__dirname, "/public");
app.use(express.static(location));

app.set("view engine", "hbs");

app.use("/", require('./routes/pages'))
app.use("/auth", require('./routes/auth'))

app.listen(5000, () => {
  console.log("Server is running at Port: 5000");
});