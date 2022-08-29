module.exports = {
  db: {
    database: process.env.DB_NAME || "Web_crud",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    options: {
      dialect: process.env.DIALECT || "sqlite",
      storage: "./db_crud.sqlite",
    },
  },
  authentication: {
    JwtSecret: process.env.JWT_SECRET || "secrest",
  },
};
