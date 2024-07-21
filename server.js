//Imported modules
const dotenv = require("dotenv").config(); 
const express = require("express");
const morgan = require('morgan');
// const mongoose = require('mongoose'); This is not needed anymore bec i have config folder

//Database call
require('./config/database.js');

// dotenv.config(); This not needed
const app = express();

//Middleware
app.use(morgan('dev'));




//Routes

//Landing Page
app.get("/", (req, res, next) => {
    res.render("index.ejs");
  });

app.listen(3000, () => {
  console.log("Listening on port 3000");
});