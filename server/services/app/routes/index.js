const express = require("express");
const router = express.Router();
const Controller = require("../controllers/index");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandlers");

router.get("/", function (req, res) {
  res.status(200).json({ message: "Hello World" });
});

router.use("/pub", require("./userRouter"));
router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.use(authentication);

router.get("/products", Controller.showAllProducts);
router.post("/products", Controller.addProduct);
router.get("/products/:id", Controller.showOneProduct);

router.put("/products/:id", Controller.updateProduct);
router.delete("/products/:id", Controller.deleteOneProduct);

router.get("/categories", Controller.showAllCategories);
router.post("/categories", Controller.addCategory);

router.use(errorHandler);

module.exports = router;
