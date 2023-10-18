
const db = require("../connection/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//create an endpoint for customer
module.exports.createUser=async (req, res) => {
try {
      const { name, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = { name, email, password: hashedPassword };
      const user = await db.customer.create({
        data: {
          ...newUser,
        },
      });
      res.status(201).json(user);
} catch (error) {
    res.status(404).json("cannot create user")
}
};

// an endpoint for user login
// "/user/login"
module.exports.userLogin= async (req, res) => {
  const { email, password } = req.body;
 try {
     const username = req.body.name;
     const user = { name: username };
     if (!email || !password) {
       res.status(401).json("please provide your password");
     }
     const customer = await db.customer.findUnique({
       where: {
         email: req.body.email,
       },
     });
     if (!customer) {
       res.status(401).json("invalid credentials");
     }

     const isMatch = await bcrypt.compare(password, customer.password);
     console.log(isMatch);
     const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "3d" });
     res.status(201).json({ token: token, name: customer.name });
 } catch (error) {
    res.status(401).json("not authenticated")
 }
}

// "/users/:vendorId"
module.exports.getUserVendor= async (req, res) => {
  const { vendorId } = req.params;
 try {
     const user = await db.vendor.findUnique({
       where: { id: +vendorId },
       include: {
         transaction: {
           select: {
             product: true,
             customer: true,
           },
         },
       },
     });
     res.status(200).json(user);
 } catch (error) {
    res.status(404).json("user not found")
 }
}
