'use strict';

const express = require('express');
const scoresRouter = express.Router();

const uuidv4 = require('uuid/v4')

let scores = [
  {name: 'pizza', score: '5', _id: uuidv4()},
  {name: 'sushi', score: '8', _id: uuidv4()},
  {name: 'curry', score: '10', _id: uuidv4()},
]


scoresRouter.get('/scores', getScores);
scoresRouter.get('/scores-bigger-than/:score', getScoresBiggerThan);
scoresRouter.post('/scores', postScores);
scoresRouter.delete('/scores/:id', deleteScores);

function getScores(request, response) {
  response.status(200).json(scores);
}

function getScoresBiggerThan(request, response) {
  response.status(200).json(scores);
}

function postScores(request, response) {
  const newScore = request.body;
  newScore._id = uuidv4();
  scores.push(newSore);
  response.status(200).json(scores);
}

function deleteScores(request, response) {
  scores = scores.filter(score => score._id !== request.params.id);
  response.status(200).json(scores);
}

module.exports = scoresRouter;