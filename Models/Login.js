module.exports = (sequelize, DataTypes) => {
  const Login = sequelize.define("login", {
    lId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autuIncrement: true,
    },
    user_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    log_token: DataTypes.TEXT,
  });
  return Login;
};
