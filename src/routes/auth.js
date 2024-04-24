const router = require("express").Router();
const {
  getLoginController,
  postRegisterController,
} = require("../controllers/authController");


const {
  handleValidationError,
  handleNotFound,
  handleError,
} = require('../helpers/handlers/exceptions');


//ROUTER AUTH
router.post("/login",  handleValidationError, getLoginController );

router.post("/register", handleValidationError, postRegisterController);

module.exports = router;