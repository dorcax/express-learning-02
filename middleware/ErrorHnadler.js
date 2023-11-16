
const { AppError } = require("./AppError")
const ErrorHandler = (err,  req, res,next) => {
    // console.log(err)
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ msg: err.message })

    }
     res.status(500).json({ msg: "something went wrong" })
}

module.exports =ErrorHandler