const router = require("express").Router();
const {
  getMetasController,
  getMetasIdController,
  getMetasWithALLController,
  postMetasController,
  putMetasController,
  deleteMetasController,
  
} = require("../controllers/metasController");

//ROUTER AUTH

router.get("/", getMetasController);
router.get("/:id", getMetasIdController);
router.post("/metasAll", getMetasWithALLController);
router.post("/", postMetasController);
router.put("/:id", putMetasController);
router.delete("/:id", deleteMetasController);

module.exports = router;