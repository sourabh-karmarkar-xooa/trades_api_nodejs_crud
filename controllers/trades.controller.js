const tradeModel = require("../models/trades.model");
const { Op } = require("sequelize");
const tradeTypes = [ "buy", "sell" ];

class Trades {
    constructor (request, response) {
        this.request = request;
        this.response = response;
    }

    isInteger (value) {
        return /^\d+$/.test(value);
    }

    async create () {
        try {
            const type = this.request.body.type;
            let user_id = this.request.body.user_id;
            const symbol = this.request.body.symbol;
            let shares = this.request.body.shares;
            let price = this.request.body.price;
            const timestamp = this.request.body.timestamp;

            user_id = this.isInteger(user_id) ? parseInt(user_id) : "";
            shares = this.isInteger(shares) ? parseInt(shares) : "";
            price = this.isInteger(price) ? parseInt(price) : "";

            if (!user_id || !shares || !price) {
                this.response.status(400).send();
            }

            if (shares < 1 || shares > 100 || !tradeTypes.includes(type)) {
                throw new Error("Invalid trade object...");
            }
            const tradesObj = { type, user_id, symbol, shares, price, timestamp };

            const createTradeResponse = await tradeModel.create(tradesObj);

            if (createTradeResponse) {
                this.response.status(201).send(createTradeResponse);
            } else {
                throw new Error("Error in inserting a new trade...");
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(`Error:Trades:create ---> ${e}`);
            this.response.status(400).send();
        }
    }

    async get () {
        try {
            const type = this.request.query.type || "";
            const user_id = this.request.query.user_id || "";
            let tradesResponse = [];

            if (type && !tradeTypes.includes(type)) {
                this.response.status(200).send(tradesResponse);
            }

            const filterArray = [];
            if (type) {
                filterArray.push({ type });
            }
            if (user_id) {
                filterArray.push({ user_id });
            }

            const filterObj = {
                where: {
                    [Op.and]: filterArray
                }
            };

            // If type and user id are present in the query parameters then filter by those else give all the records
            if (type || user_id) {
                tradesResponse = await tradeModel.findAll(filterObj);
            } else {
                tradesResponse = await tradeModel.findAll();
            }

            this.response.status(200).send(tradesResponse);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(`Error:Trades:get ---> ${e}`);
            this.response.status(400).send();
        }
    }

    async getById () {
        try {
            const id = this.request.params.id || "";
            const tradesResponse = id ? await tradeModel.findByPk(id) : "";

            if (tradesResponse) {
                this.response.status(200).send(tradesResponse);
            } else {
                throw new Error("Trade ID cannot be found...");
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(`Error:Trades:getById ---> ${e}`);
            this.response.status(404).send("ID not found");
        }
    }
}

module.exports = Trades;
