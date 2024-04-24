const { getLoginUserService, postRegisterUser } = require("../services/auth");

const getLoginController = (req, res) => {
  return getLoginUserService(req, res);
};

const postRegisterController = (req, res) => {
  return postRegisterUser(req, res);
};

module.exports = { getLoginController, postRegisterController };