const Sequelize = require("sequelize");
const config = require("../config/_db");

const db = {};

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./User")(sequelize, Sequelize);
db.LoginUser = require("./Login")(sequelize, Sequelize);

module.exports = db;
