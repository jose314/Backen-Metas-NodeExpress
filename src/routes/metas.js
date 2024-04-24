const router = require("express").Router();
const {
  getLoginController,
  postRegisterController,
} = require("../controllers/authController");

//ROUTER AUTH

router.post("/login", getLoginController);

router.post("/register", postRegisterController);

module.exports = router;