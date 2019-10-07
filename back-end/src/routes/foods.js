'use strict';

const express = require('express');
const foodsRouter = express.Router();

const uuidv4 = require('uuid/v4')

let foods = [
  {_id: uuidv4(), name: 'pizza', score: '5'},
  {_id: uuidv4(), name: 'sushi', score: '8'},
  {_id: uuidv4(), name: 'curry', score: '10'},
]


foodsRouter.get('/foods', getFoods);
foodsRouter.post('/foods', postFoods);
foodsRouter.delete('/foods/:id', deleteFoods);

function getFoods(request, response) {
  response.status(200).json(foods);
}

function postFoods(request, response) {
  // update list with new food
  const newFood = request.body;
  newFood._id = uuidv4();
  foods.push(newFood);
  response.status(200).json(foods);
}

function deleteFoods(request, response) {
  foods = foods.filter(food => food._id !== request.params.id);
  response.status(200).json(foods);
}

module.exports = foodsRouter;