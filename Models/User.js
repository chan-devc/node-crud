const Bluebird = require("bluebird");
const bcrypt = Bluebird.promisifyAll(require("bcrypt-nodejs"));

function hasPassword(User, option) {
  const SALT_FACTOR = 6;
  if (!User.changed("password")) {
    return;
  }
  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then((salt) => bcrypt.hashAsync(User.password, salt, null))
    .then((hash) => {
      User.setDataValue("password", hash);
    });
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      uId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING(100),
      email: {
        type: DataTypes.STRING(100),
        unique: true,
      },
      password: DataTypes.STRING(255),
    },
    {
      hooks: {
        beforeSave: hasPassword,
      },
    }
  );
  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password);
  };
  return User;
};
