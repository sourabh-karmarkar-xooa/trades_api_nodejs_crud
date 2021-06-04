const express = require("express");
const router = express.Router();
const Trades = require("../controllers/trades.controller");

router.post("/", async function (request, response) {
    const trade = new Trades(request, response);
    return await trade.create();
});

module.exports = router;
