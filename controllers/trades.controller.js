const tradeModel = require('../models/trades.model');

class Trades {

	constructor(request, response) {

        this.request = request;
		this.response = response;

    }

	async create() {

		const tradesObj = {
			type: this.request.body.type,
			user_id: this.request.body.user_id,
			symbol: this.request.body.symbol,
			shares: this.request.body.shares,
			price: this.request.body.price,
			timestamp: this.request.body.timestamp,
		};

		try {

			const createTradeResponse = await tradeModel.create(tradesObj);

			if (createTradeResponse) {

				this.response.status(201).send(createTradeResponse);

			} else {

				this.response.status(400).send('Error in inserting a new trade');

			}

		} catch(e) {

			console.log(`Error:Trades:create ---> ${e}`);
			this.response.status(400).send(e);
		
		}              
	}

}

module.exports = Trades;