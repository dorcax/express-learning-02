const db = require("../connection/db");


// create product with  vendor
module.exports.createProduct= async (req, res) => {
  const { vendorId } = req.params;
  try {
    const createProduct = await db.product.create({
      data: {
        ...req.body,
        vendor: {
          connect: {
            id: +vendorId,
          },
        },
      },
    });
    res.status(201).json(createProduct);
  } catch (error) {
    res.status(400).json("can not create product ")
  }
}

// an endpoint to get each vendor and all products which the specified vendor have
module.exports.getProductVendor= async (req, res) => {
  const { vendorId } = req.params;
try {
    
  const product = await db.vendor.findUnique({
    where: { id: +vendorId },
    include: {
      product: true,
    },
  });
  res.status(200).json(product);
} catch (error) {
    res.status(404).json("cant find a product with that particular id")
}
}
//an endpoint for all products
module.exports.getProduct = async (req, res) => {
    try {
        const product = await db.product.findMany({
    include: {
      vendor: true,
    },
  });
  res.status(200).json(product);

    } catch (error) {
       res.status(401).json('no product found') 
    }
}
