class AppError extends Error{
    constructor(message, statusCode) {
        super()
        this.message = message,
        this.statusCode =statusCode
    }
}
const createCustomError = (message, statusCode) => {
    return new AppError(message,statusCode)
}
module.exports = {  createCustomError ,AppError}
// module.exports =AppError