const express = require("express");

const productRouter = require("../controller/productController");
const router =express.Router()




router.route("/:vendorId")
  .post(productRouter.createProduct)
router.route("/:vendorId")
  .get(productRouter.getProductVendor);
router.route("/")
    .get(productRouter.getProduct);


module.exports =router