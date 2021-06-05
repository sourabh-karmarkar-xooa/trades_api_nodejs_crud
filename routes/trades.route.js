const express = require("express");
const router = express.Router();
const Trades = require("../controllers/trades.controller");

router.post("/", async function (request, response) {
    const trade = new Trades(request, response);
    return await trade.create();
});

router.get("/", async function (request, response) {
    const trade = new Trades(request, response);
    return await trade.get();
});

router.get("/:id", async function (request, response) {
    const trade = new Trades(request, response);
    return await trade.getById();
});

router.delete("/:id", async function (request, response) {
    response.status(405).send();
});

router.put("/:id", async function (request, response) {
    response.status(405).send();
});

router.patch("/:id", async function (request, response) {
    response.status(405).send();
});

module.exports = router;
