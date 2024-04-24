// config/sequelize.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci'
  }
});

module.exports = sequelize;
