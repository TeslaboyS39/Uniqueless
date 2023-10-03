const express = require("express");
const router = express.Router();
const Controller = require("../controllers/users");
// const authentication = require("../middlewares/authentication");
// const errorHandler = require("../middlewares/errorHandlers");

router.get("/", function (req, res) {
  res.status(200).json({ message: "Hello World" });
});

router.get("/users", Controller.findAll);
router.post("/users", Controller.create);
router.get("/users/:userId", Controller.findById);
router.delete("/users/:userId", Controller.deleteById);

// router.use(errorHandler);

module.exports = router;
