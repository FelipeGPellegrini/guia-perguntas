const Sequelize = require("sequelize");

const connection = new Sequelize('guiaperguntas','root','22112004', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection

   