const Validator = require("../Validator/UserValidator");
const auth = require("../Helper/isAuthen");
const User_CL = require("../controller/UserController");
const Login_CL = require("../controller/LoginController");

module.exports = (app) => {
  //start rouer user
  app.post(
    "/user",
    Validator.CheckUser(),
    Validator.RenderUser,
    User_CL.Register
  );

  app.put(
    "/user/:uId",
    auth,
    Validator.CheckUser(),
    Validator.RenderUser,
    User_CL.Update
  );

  app.get("/user", auth, User_CL.Display);

  app.get("/user/:uId", auth, User_CL.getOnly);

  app.delete("/user/:uId", auth, User_CL.Delete);

  //end rouer user

  // start login

  app.post("/login", Login_CL.loginUser);

  app.post("/logout", auth, Login_CL.logout);
};
