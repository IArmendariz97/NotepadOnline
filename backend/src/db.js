require("dotenv").config();

const { Sequelize } = require("sequelize");

const { DB_DEPLOY } = process.env;
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT } = process.env;

// const sequelize = new Sequelize(DB_DEPLOY, {
//   logging: false,
//   native: false,
// });

const sequelize = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  {
    logging: false,
    native: false,
    // dialectModule: pg,
  }
);

module.exports = sequelize;
