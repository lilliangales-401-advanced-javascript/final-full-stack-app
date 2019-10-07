'use strict';

const express = require('express');
const foodsRouter = express.Router();

const uuidv4 = require('uuid/v4')

let foods = [
  {name: 'pizza', score: 5 , _id: uuidv4()},
  {name: 'sushi', score: 8 , _id: uuidv4()},
  {name: 'curry', score: 10, _id: uuidv4()},
]


foodsRouter.get('/foods', getFoods);
foodsRouter.get('/scores-bigger-than/:score', getScoresBiggerThan);
foodsRouter.post('/foods', postFoods);
foodsRouter.delete('/foods/:id', deleteFoods);

function getFoods(request, response) {
  foods.sort((a,b) => (a.score < b.score) ? 1: -1)
  response.status(200).json(foods);
}

function getScoresBiggerThan(request, response) {
  let foodsBiggerThan = foods.filter(food => parseInt(food.score) > parseInt(request.params.score));

  console.log(foodsBiggerThan)

  response.status(200).json(foodsBiggerThan);
}

function postFoods(request, response) {
  const newFood = request.body;
  newFood._id = uuidv4();
  foods.push(newFood);
  foods.sort((a,b) => (a.score < b.score) ? 1: -1)
  response.status(200).json(foods);
}

function deleteFoods(request, response) {
  foods = foods.filter(food => food._id !== request.params.id);
  response.status(200).json(foods);
}

module.exports = foodsRouter;