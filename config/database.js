const Sequelize = require('sequelize');
const config = require('./index.js');
const sequelize = new Sequelize(config.database.development);

module.exports = sequelize;
