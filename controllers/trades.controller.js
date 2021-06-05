const tradeModel = require("../models/trades.model");
const { Op } = require("sequelize");

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
            const type = this.request.query.type || "";
            const user_id = this.request.query.user_id || "";

            const filterObj = {
                where: {
                    [Op.and]: [
                        { type },
                        { user_id }
                    ]
                }
            };

            let tradesResponse;

            // If type and user id are present in the query parameters then filter by those else give all the records
            if (type && user_id) {
                tradesResponse = await tradeModel.findAll(filterObj);
            } else {
                tradesResponse = await tradeModel.findAll();
            }

            this.response.status(200).send(tradesResponse);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(`Error:Trades:get ---> ${e}`);
            this.response.status(400).send(e);
        }
    }

    async getById () {
        try {
            const id = this.request.params.id || "";
            const tradesResponse = id ? await tradeModel.findByPk(id) : "";

            if (tradesResponse) {
                this.response.status(200).send(tradesResponse);
            } else {
                this.response.status(404).send("ID not found");
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(`Error:Trades:getById ---> ${e}`);
            this.response.status(400).send(e);
        }
    }
}

module.exports = Trades;
