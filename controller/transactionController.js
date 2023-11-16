const db = require("../connection/db");
const isAuthenticated = require("../middleware/auth");

//an endpoint for  transaction ,customer and product

module.exports.createProductTransaction =async (req, res) => {
    const { customerId, productId, vendorId } = req.params;
  try {
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
module.exports.getTransaction=async (req, res) => {
  const { vendorId } = req.params;
try {
  const getuser = await db.transaction.
    findMany()
        // where: { vendorId: +vendorId },
        // select: {
        //   pricesold: true,
        //   product: {
        //     select: {
        //       price: true,
        //     },
        //   }
        // },
      // include: {
      //   product: true,
      //   customer: true,
      //   vendor:true
      //   }
      // });
  res.status(200).json(getuser);
 
  
} catch (error) {
    res.status(404).json("cannt find the transaction product of the customer id")
}
}
