const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("./controllers/products");

router
  .get("/api/v1/products", getProducts)
  .get("/api/v1/products/:id", getProduct)
  .post("/api/v1/products", addProduct)
  .put("/api/v1/products/:id", updateProduct)
  .delete("/api/v1/products/:id", deleteProduct);

module.exports = router;
