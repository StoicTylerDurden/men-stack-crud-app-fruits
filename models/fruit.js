// models/fruit.js

const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({ // The 'new' owrd means We're creating a new class 
  name: String,
  isReadyToEat: Boolean,
});

const Fruit = mongoose.model("Fruit", fruitSchema); // create model

module.exports = Fruit;