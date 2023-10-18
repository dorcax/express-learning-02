const db = require("../connection/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.createVendor= async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
 
    try {
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
module.exports.vendorLogin= async (req, res) => {
  const { email, password } = req.body;
try {
      const username = req.body.name;
      const user = { name: username };
      if (!email || !password) {
        res.status(404).json("Please provide your email and password");
      }

      const vendor = await db.vendor.findUnique({
        where: {
          email: req.body.email,
        },
      });
      if (!vendor) {
        res.status(401).json("provide your email");
      }
      // compare password
      const comparePassword = await bcrypt.compare(password, vendor.password);
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "3d" });
      res.status(200).json({ token: token, name: vendor.name });
} catch (error) {
    res.status(401).json("user unauthenticated")
}
}