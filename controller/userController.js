const db = require("../connection/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const { createCustomError } = require("../middleware/AppError");
//create an endpoint for customer
module.exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const validateSchema = joi
      .object({
        name: joi.string().required().min(5).max(15),
        email: joi
          .string()
          .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
          .required(),
        password: joi.string().required().min(6).max(15),
      })
      .required();
    const result = validateSchema.validate(req.body);
    if (result.error) {
      const msg = result.error.details.map((el) => el.message).join(",");
      // console.log(ms
      return next(createCustomError(msg, 400));
    }

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
    res.status(404).json("cannot create user");
  }
};

// an endpoint for user login
// "/user/login"
module.exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const username = req.body.name;
    const user = { name: username };
    if (!email || !password) {
      return next(createCustomError("please provide your password", 401));
    }
    const customer = await db.customer.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!customer) {
      return next(createCustomError("invalid credentials", 401));
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    console.log(isMatch);
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "3d" });
    res.status(201).json({ token: token, name: customer.name });
  } catch (error) {
    res.status(401).json("not authenticated");
  }
};

// "/users/:vendorId"

