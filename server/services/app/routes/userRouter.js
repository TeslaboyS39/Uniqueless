const express = require("express");
const pubRouter = express.Router();
const UserController = require("../controllers/userController");
const errorHandler = require("../middlewares/errorHandlers");

pubRouter.get("/products", UserController.userShowAllProducts);
pubRouter.post("/products", UserController.userAddProduct);
pubRouter.put("/products/:id", UserController.userUpdateProduct);
pubRouter.get("/products/:id", UserController.userShowOneProduct);
pubRouter.delete("/products/:id", UserController.userDeleteProduct);

pubRouter.use(errorHandler);

module.exports = pubRouter;
