const router = require("express").Router();
const {
  getSubMetasController,
  getSubMetasIdController,
  postSubMetasController,
  putSubMetasController,
  deleteSubMetasController
} = require("../controllers/submetasController");

//ROUTER AUTH

router.get("/", getSubMetasController);
router.get("/:id", getSubMetasIdController);
router.post("/", postSubMetasController);
router.put("/:id", putSubMetasController);
router.delete("/:id", deleteSubMetasController);

module.exports = router;