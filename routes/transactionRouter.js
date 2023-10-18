const express = require("express");
const isAuthenticated = require("../middleware/auth");
const transactionRouter = require("../controller/transactionController");
const router =express.Router()
// transaction


router.route("/:productId/:customerId/:vendorId")
    .post(transactionRouter.createProductTransaction)
router.route("/:customerId")
    .get(transactionRouter.getTransaction)

module.exports =router