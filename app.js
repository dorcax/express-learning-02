const express = require("express")
const app = express()
const db = require("./connection/db")
const dotenv = require("dotenv")
dotenv.config()

const port = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


//create vendors endpoint 
app.post("/vendor", async (req, res) => {
    const createVendor =  await db.vendor.create({
        data: {
            ...req.body
        }
    })
    res.status(201).json(createVendor)
})
// create product with  vendor
app.post("/product/:vendorId", async (req, res) => {
    const { vendorId } = req.params
    const createProduct = await db.product.create({
        data: {
            ...req.body,
            vendor: {
                connect: {
                    id: +vendorId
                }
            }
        }
        
    })
    res.status(201).json(createProduct);
})

//create an endpoint for customer
app.post("/user", async (req, res) => {
    // const { vendorId } = req.params
    const user = await db.customer.create({
        data: {
            ...req.body
            }
        
        
    })
    res.status(201).json(user)
})

//an endpoint for  transaction ,customer and product

app.post("/transaction/:productId/:customerId/:vendorId", async (req, res) => {
    const { customerId, productId,vendorId } = req.params
    const transaction = await db.transaction.create({
        data: {
            ...req.body,
            product: {
                connect: {
                    id:+productId
                }
            },
            customer: {
                connect: {
                    id:+customerId
                }
            },
            vendor: {
                connect: {
                    id:+vendorId
                }
            }

        }
    })
    res.status(201).json(transaction)
})
// an endpoint to get each vendor and all products which the specified vendor have
app.get("/products/:vendorId", async (req, res) => {
  const { vendorId } = req.params;
  const product = await db.vendor.findUnique({
      where: { id: +vendorId },
      include: {
          product:true
      }
  });
  res.status(200).json(product);
});
//an endpoint for all products 
app.get("/product", async (req, res) => {
    const product = await db.product.findMany({
        include: {
            vendor:true
        }
    })
       res.status(200).json(product);
})

//get each customer transaction including product ,the amount of which an item was product and sold.....
app.get("/transaction/:customerId", async (req, res) => {
    const{customerId} =req.params
    const getuser = await db.transaction.findUnique({
        where: { id: +customerId }, 
        include: {
            product:
            {
                select: {
                price:true
            }
            }
        },
        include: {
            customer: {
                select: {
                    name:true
                }
            }
        },
        select: {
            pricesold:true
        }

      
    })
    res.status(200).json(getuser)
})


app.get("/users/:vendorId", async (req, res) => {
    const{vendorId} =req.params
    const user = await db.vendor.findUnique({
        where: { id: +vendorId },
        include: {
            transaction: {
                select: {
                    product: true,
                    customer:true
                }
            }
        }
    })
    res.status(200).json(user)
})



app.listen(port, () => {
    console.log(`App listening on port ${port} `)
})