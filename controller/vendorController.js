const db = require("../connection/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const joi = require("joi")
const {createCustomError} =require("../middleware/AppError")
// const AppError =require("../middleware/AppError")

// an endpoint to create user
module.exports.createVendor = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const vendorSchema = joi
      .object({
        name: joi.string().required().min(4).max(30),
        email: joi
          .string()
          .required()
          .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
        password: joi.string().min(5).max(15).required(),
      })
      .required();
    const { error } = vendorSchema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(",");
      return next(createCustomError(msg, 400));
    }
    console.log(result);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newVendor = { name, email, password: hashedPassword };
    const createVendor = await db.vendor.create({
      data: {
        ...newVendor,
      },
    });

    res.status(201).json({ createVendor: createVendor });
  } catch (error) {
    res.status(404).json("cant register a vendor")
 
  }
}


// an endpoint forr vendor to login in
module.exports.vendorLogin = async (req, res,next) => {
  const { email, password } = req.body;
try {
  const username = req.body.name;
   const id =req.body.id
      const user = { name: username ,userId:id};
      if (!email || !password) {
        //  return next( new AppError("Please provide your email and password"));
         return next( createCustomError("provide your  email and password",404))
      }

      const vendor = await db.vendor.findUnique({
        where: {
          email: req.body.email
        },
      });
      if (!vendor) {
        // res.status(401).json("the email doesnt exist");
        return next(createCustomError("provide your  correct email",401))
      }
      // compare password
      const comparePassword = await bcrypt.compare(password, vendor.password);
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "3d" });
       res.status(200).json({vendor,token});
} catch (error) {
    res.status(401).json("user unauthenticated")
}
}
module.exports.getUserVendor = async (req, res) => {
  const { vendorId } = req.params;
    try{
    const user = await db.vendor.findUnique({
      where: { id: +vendorId },
      include: {
        transaction: {
          select: {
            product: true,
            customer: true,
            pricesold: true,
            quantity: true,
            id:true
            
            
        }
        }
          // select: {
          //   product: true,
          //   customer: true,
          // },
        
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json("user not found");
  }
}
