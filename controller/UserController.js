const { User } = require("../Models");
module.exports = {
  // register User
  async Register(req, res) {
    let data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    if (data.email != "" || data.password != "") {
      await User.create(data)
        .then(() => {
          return res.status(201).send({
            msg: "Register User Is success !!!",
          });
        })
        .catch((error) => {
          return res.status(500).send({
            msg: "Server error or Email Duplicate",
            error: error,
          });
        });
    } else {
      return res.status(400).send({
        msg: "Please Enter Value Again !!!",
      });
    }
  },

  // index user
  async Display(req, res) {
    let user = await User.findAll({
      attributes: ["uId", "name", "email", "createdAt", "updatedAt"],
      order: [["uid", "desc"]],
    });
    if (user) {
      return res.status(200).send({
        msg: "loading data is complete",
        counts: user.length,
        value: user,
      });
    } else {
      return res.status(500).send({
        msg: "Server Error",
      });
    }
  },

  // update User
  async Update(req, res) {
    let data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    let user = await User.findByPk(req.params.uId);
    if (user) {
      await user
        .update(data)
        .then(() => {
          return res.status(201).send({
            msg: "Update User is success!!!",
          });
        })
        .catch(() => {
          return res.status(500).send({
            msg: "Server Error or Email Duplicate",
          });
        });
    } else {
      return res.status(404).send({
        msg: "Id user is Not found in users",
      });
    }
  },

  // get only User
  async getOnly(req, res) {
    let user = await User.findOne({
      attributes: ["uId", "name", "email", "createdAt", "updatedAt"],
      where: {
        uId: req.params.uId,
      },
    });

    if (user) {
      return res.status(200).send({
        msg: "Searching User is success!!!",
        value: user,
      });
    } else {
      return res.status(404).send({
        msg: "Id user is Not found in users",
      });
    }
  },

  // delete onl User
  async Delete(req, res) {
    let user = await User.findByPk(req.params.uId);
    if (user) {
      await user.destroy();
      return res.status(200).send({
        msg: "Remove User is success!!!",
      });
    } else {
      return res.status(404).send({
        msg: "Id user is Not found in users",
      });
    }
  },
};
