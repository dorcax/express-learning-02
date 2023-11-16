const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const productRouter =require("./routes/productRouter")
const userRouter =require("./routes/routes")
const vendorRouter =require("./routes/vendorRouter")
const transactionRouter = require("./routes/transactionRouter")
const isAuthenticated = require("./middleware/auth");
const ErrorHandler =require("./middleware/ErrorHnadler")
const port = process.env.PORT || 5000;
const cors =require("cors")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())


app.use("/vendor", vendorRouter)
app.use("/product",isAuthenticated,productRouter)
app.use("/user", userRouter)
app.use("/transaction",transactionRouter)


// app.use((err, req, res, next) => {
//   const { status = 500, message = "something went wrong" } = err
//    res.status(status).send(message)
  
// })
app.use(ErrorHandler)


app.listen(port, () => {
  console.log(`App listening on port ${port} `);
});
