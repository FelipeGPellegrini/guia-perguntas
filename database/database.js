const Sequelize = require("sequelize");
require('dotenv').config();


const connection = new Sequelize('guiaperguntas','root', process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection
