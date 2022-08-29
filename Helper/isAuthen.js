const Passport = require("passport");
const { LoginUser } = require("../Models");
module.exports = (req, res, next) => {
  Passport.authenticate("jwt", async (err, user) => {
    if (err || !user) {
      res.status(403).send({
        msg: "Denies Access ",
      });
    } else {
      let tokon = req.headers.authorization;
      await LoginUser.findOne({
        where: {
          user_Id: user.uId,
        },
      })
        .then((result) => {
          if (result.dataValues.log_token == tokon) {
            req.user = user;
            next();
          } else {
            res.status(403).send({
              msg: "Denies Access ",
            });
          }
        })
        .catch(() => {
          res.status(403).send({
            msg: "Login Again",
          });
        });
    }
  })(req, res, next);
};
