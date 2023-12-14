const db = require("../connection/db");
const joi =require("joi")

// create product with  vendor
module.exports.createProduct = async (req, res) => {
  const { vendorId } = req.params;
  // const{name,description,price,quantity} =req.body
  try{
    const productSchema =joi.object({
      name:joi.string().required().min(4).max(20),
      description:joi.string().required().min(10).max(20),
      price:joi.number().required().min(0),
      quantity:joi.number().required().min(0)
    }).required()
    const {error} =productSchema.validate(req.body)
    if(error){

      const msg = error.details.map((el) => el.message).join(",");
      console.log(msg)
      return next(createCustomError(msg, 404))
    }
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
   
  }catch(error){
    res.status(404).json("product cannot be successfully created")
  }
}
 
 



// an endpoint to each product 
module.exports.eachProudct =async(req,res)=>{
  const {vendorId}= req.params
  
try {
  const product =await db.product.findMany({
    where:{vendorId:+vendorId},
    // where:{AND:[ {id:+productId},{vendorId:+vendorId}]},

    select:{
      id:true,
      name:true,
      description:true,
      quantity:true,
      price:true,
      vendor:true
    }
   
  })
  // console.log(product)

  res.status(200).json({product:product})
} 
  catch(error) {
      res.status(404).json(" no product found with that particular id")
    }
} 

   
// find single product 
module.exports.eachProudcts =async(req,res)=>{
  const {productId,vendorId}= req.params
  
try {
  const product =await db.product.findUnique({
    where:{vendorId:+vendorId,
    id:+productId},
  

    select:{
      id:true,
      name:true,
      description:true,
      quantity:true,
      price:true,
      vendor:true
    }
   
  })

  res.status(200).json(product)
} 
  catch(error) {
      res.status(404).json(" no product found with that particular id")
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
    res.status(401).json("no product found");
  }
};


// edit product 
module.exports.Editproduct=async(req,res)=>{
  const {productId,vendorId}= req.params
  try {
    const Editproduct =await db.product.update({
      where:{id:+productId ,vendorId:+vendorId},
      data:{
        ...req.body
      }
    })
    console.log("edited")
    res.status(200).json(Editproduct)
  } catch (error) {
    res.status(404).json("unable to edit the product ")
  }
    
  } 

// an endpoint for delete request
module.exports.Deleteproduct=async(req,res)=>{
  const {productId,vendorId}= req.params
  
    const deleteproduct =await db.product.delete({
      where:{id:+productId,
      vendorId:+vendorId}

    })
    // console.log(deleteproduct)
    res.status(200).json("product deleted!!!!")
  }
//    catch (error) {
//     res.status(404).json("cant delete the product")
//   }
// }



