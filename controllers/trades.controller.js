const tradeModel = require("../models/trades.model");

class Trades {
    constructor (request, response) {
        this.request = request;
        this.response = response;
    }

    async create () {
        try {
            const tradesObj = {
                type: this.request.body.type,
                user_id: this.request.body.user_id,
                symbol: this.request.body.symbol,
                shares: this.request.body.shares,
                price: this.request.body.price,
                timestamp: this.request.body.timestamp
            };

            const createTradeResponse = await tradeModel.create(tradesObj);

            if (createTradeResponse) {
                this.response.status(201).send(createTradeResponse);
            } else {
                this.response.status(400).send("Error in inserting a new trade...");
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(`Error:Trades:create ---> ${e}`);
            this.response.status(400).send(e);
        }
    }

    async get () {
        try {
            const tradesResponse = await tradeModel.findAll();

            if (tradesResponse) {
                this.response.status(200).send(tradesResponse);
            } else {
                this.response.status(400).send("Error in fetching trades...");
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(`Error:Trades:get ---> ${e}`);
            this.response.status(400).send(e);
        }
    }
}

module.exports = Trades;
