const { body, validationResult } = require("express-validator");

const CheckUser = () => {
  return [
    body("name").notEmpty().withMessage("Name is require"),
    body("email").isEmail().withMessage("Email is require"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be then 8 charactor")
      .notEmpty()
      .withMessage("Password is require"),
  ];
};

function RenderUser(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).send({
      err: err.array(),
    });
  }
  next();
}

module.exports = { CheckUser, RenderUser };
