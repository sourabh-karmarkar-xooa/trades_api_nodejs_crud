// Uncomment the code below to use Sequelize ORM
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:", {
    // eslint-disable-next-line no-console
    logging: console.log
});

// Uncomment the code below to use Mongoose ORM
// const mongoose = require('mongoose');

// Insert your model definition below

const Trades = sequelize.define("Trades", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    symbol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shares: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    initialAutoIncrement: 1,
    tableName: "Trades",
    timestamps: false
});

module.exports = Trades;
