const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const Morgen = require("morgan");
const { sequelize } = require("./Models");

const port = process.env.PORT || 3100;
const IP = process.env.PORT || "127.0.0.1";

app.use(Morgen("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cors access client
app.use(cors());
require("./Helper/passport");

require("./Router/index")(app);

sequelize.sync({ force: false }).then(() => {
  app.listen(port, IP, () => {
    console.log(`Server Running ${IP}:${port}`);
  });
});
