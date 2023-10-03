const express = require("express");
const Orchestrator = require("../controllers");
const router = express.Router();

// User
router.get("/users", Orchestrator.showUsers);
router.post("/users", Orchestrator.addUser);
router.get("/users/:id", Orchestrator.showDetailUser);
router.delete("/users/:id", Orchestrator.deleteUser);

// App (Main Entity: Product)
router.get("/products", Orchestrator.showProducts);
router.post("/products", Orchestrator.addProduct);
router.put("/products/:id", Orchestrator.updateProduct);
router.get("/products/:id", Orchestrator.showDetailProduct);
router.delete("/products/:id", Orchestrator.deleteProduct);

module.exports = router;
