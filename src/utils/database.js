const { Sequelize } = require("sequelize");
const config = require("../../config");

const db = new Sequelize(config.DB[config.NODE_ENV]);

module.exports = db;
