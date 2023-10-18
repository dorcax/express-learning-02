const express = require("express")
const isAuthenticated = require("../middleware/auth");
const userRouter = require("../controller/userController")
const router = express.Router();


// user router
router.route("/")
    .post(userRouter.createUser);
router.route("/login")
    .post(userRouter.userLogin);
router.route("/user/:vendorId")
    .get(userRouter.getUserVendor);




module.exports=router