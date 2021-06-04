const express = require('express');
const router = express.Router();
const Trades = require('../models/trades');

router.post('/', function (request, response) {

  return Trades.create({
      type: request.body.type,
      user_id: request.body.user_id,
      symbol: request.body.symbol,
      shares: request.body.shares,
      price: request.body.price,
      timestamp: request.body.timestamp,
  }).then(function (trades) {
      if (trades) {
          response.status(201).send(trades);
      } else {
          response.status(400).send('Error in insert new record');
      }
  });
});

module.exports = router;
