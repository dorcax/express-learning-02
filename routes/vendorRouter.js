const express = require("express")
const vendorRouter = require("../controller/vendorController");
const router = express.Router()
const isAuthenticated =require("../middleware/auth")


router.route("/")
    .post(vendorRouter.createVendor);
router.route("/login")
    .post(vendorRouter.vendorLogin);
router.route("/:vendorId")
    .get(vendorRouter.getUserVendor);

module.exports =router