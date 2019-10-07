'use strict';

const express = require('express');
const cors = require('cors');

const app = express();
const foodsRouter = require('./routes/foods');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(foodsRouter);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server up on ${port}`);
    });
  },
};
