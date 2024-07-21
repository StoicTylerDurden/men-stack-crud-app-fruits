// Imported modules
const dotenv = require("dotenv").config(); 
const express = require("express");
const morgan = require('morgan');
const methodOverride = require("method-override"); // new

// Database call
require('./config/database.js');

// Import Fruit model
const Fruit = require("./models/fruit.js");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // Allows overriding of HTTP methods via query parameter
app.use(morgan('dev'));

// Routes

// Landing Page
app.get("/", (req, res, next) => {
  res.render("index.ejs");
});

// GET /fruits/new
app.get("/fruits/new", (req, res) => {
  res.render('fruits/new.ejs');
});

// POST /fruits
app.post("/fruits", async (req, res, next) => {
  if (req.body.isReadyToEat === 'on') {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  console.log(req.body);
  
  await Fruit.create(req.body);
  res.redirect("/fruits/new");
});

// GET /fruits
app.get('/fruits', async (req, res, next) => {
  const fruits = await Fruit.find();
  console.log(fruits);
  res.render('fruits/index.ejs', { fruits });
});

// GET /fruits/:fruitId
app.get("/fruits/:fruitId", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/show.ejs", { fruit: foundFruit });
});

// DELETE /fruits/:fruitId
app.delete("/fruits/:fruitId", async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect("/fruits");
});

// GET localhost:3000/fruits/:fruitId/edit
app.get("/fruits/:fruitId/edit", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/edit.ejs", {
    fruit: foundFruit,
  });
});

// server.js

app.put("/fruits/:fruitId", async (req, res) => {
  // Handle the 'isReadyToEat' checkbox data
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  
  // Update the fruit in the database
  await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);

  // Redirect to the fruit's show page to see the updates
  res.redirect(`/fruits/${req.params.fruitId}`);
});


app.listen(3000, () => {
  console.log("Listening on port 3000");
});
