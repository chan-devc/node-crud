const { User, LoginUser } = require("../Models");
const { jwtCreate } = require("../Helper/Jwt");

module.exports = {
  //login
  async loginUser(req, res) {
    let data = {
      email: req.body.email,
      password: req.body.password,
    };

    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return res.status(404).send({
        msg: "email is incurrent !!!",
      });
    }
    const isPassword = await user.comparePassword(data.password);
    if (!isPassword) {
      return res.status(404).send({
        msg: "Password is incurrect",
      });
    }
    const userJSON = user.toJSON();

    // remove log
    let log_del = await LoginUser.findOne({
      where: {
        user_Id: userJSON.uId,
      },
    });
    if (log_del) {
      await log_del.destroy().then(async () => {
        // user token
        const token = jwtCreate(userJSON);

        let log = {
          user_Id: userJSON.uId,
          log_token: "Bearer " + token,
        };
        // create Log
        await LoginUser.create(log).then(() => {
          return res.status(200).send({
            user: userJSON.uId,
            token: token, // create Token on User
          });
        });
      });
    }
  },

  // logout
  async logout(req, res) {
    let tokens = req.headers.authorization;
    let log = await LoginUser.findOne({
      where: {
        log_token: tokens,
      },
    });
    if (log) {
      await log.destroy();
      res.status(200).send({
        msg: "Logout is success!!!",
      });
    } else {
      return res.status(404).send({
        msg: "token is not Found !!!",
      });
    }
  },
};
