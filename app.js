const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const productRouter =require("./routes/productRouter")
const userRouter =require("./routes/routes")
const vendorRouter =require("./routes/vendorRouter")
const transactionRouter = require("./routes/transactionRouter")
const isAuthenticated = require("./middleware/auth");
const port = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/vendor", vendorRouter)
app.use("/product",isAuthenticated, productRouter)
app.use("/user", userRouter)
app.use("/transaction",isAuthenticated,transactionRouter)





app.listen(port, () => {
  console.log(`App listening on port ${port} `);
});
