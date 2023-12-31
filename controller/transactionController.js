const db = require("../connection/db");
const joi = require("joi")
const { createCustomError } = require("../middleware/AppError");

//an endpoint for  transaction ,customer and product

module.exports.createProductTransaction = async (req, res) => {
  const { customerId, productId, vendorId } = req.params;


  try {
    const transactionSchema = joi.object({
      priceSold: joi.number().required().min(0),
      quantity: joi.number().min(0).required()

    }).required()
    const { error } = transactionSchema.validate(req.body)
    if (error) {
      const msg = error.details.map((el) => el.message).join(",")
      return next(createCustomError(msg, 404))
    }


    const transaction = await db.transaction.create({
      data: {
        ...req.body,
        product: {
          connect: {
            id: +productId,
          },
        },
        customer: {
          connect: {
            id: +customerId,
          },
        },
        vendor: {
          connect: {
            id: +vendorId,
          },
        },
      },
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(404).json("not found")
  }


}

//get each customer transaction including product ,the amount of which an item was product and sold.....
module.exports.getTransaction = async (req, res) => {
  // const { vendorId } = req.params;
  try {
    const getuser = await db.transaction.
      findMany()

    res.status(200).json(getuser);


  } catch (error) {
    res.status(404).json("cannt find the transaction product of the customer id")
  }
}

// an endpoint to delete transaction
module.exports.DeleteTransaction = async (req, res) => {
  const
    { transactionId, vendorId } = req.params
  // try {
  const DeleteTransaction = await db.transaction.delete({
    where: {
      id: +transactionId,
      vendorId: +vendorId
    }
  })
  console.log("deleted")
  // } catch (error) {

  // }
}