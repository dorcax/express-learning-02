const express = require("express");

const productRouter = require("../controller/productController");
const router =express.Router()




router.route("/:vendorId")
  .post(productRouter.createProduct)
  .get(productRouter.eachProudct )

router.route("/")
    .get(productRouter.getProduct);
router.route("/:productId/:vendorId")
     .get(productRouter.eachProudcts)
router.route("/edit/:productId/:vendorId")
      .patch(productRouter.Editproduct)
router.route("/delete/:productId/:vendorId")
      .delete(productRouter.Deleteproduct)
module.exports =router