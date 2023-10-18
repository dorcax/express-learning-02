const express = require("express")
const vendorRouter = require("../controller/vendorController");
const router =express.Router()


router.route("/")
    .post(vendorRouter.createVendor);
router.route("/login")
    .post(vendorRouter.vendorLogin);

module.exports =router