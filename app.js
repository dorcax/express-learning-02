const express = require("express");
const app = express();
const db = require("./connection/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const isAuthenticated = require("./middleware/auth");
dotenv.config();

const port = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//create vendors endpoint
app.post("/vendor", async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newVendor = { name, email, password: hashedPassword };
  const createVendor = await db.vendor.create({
    data: {
      ...newVendor,
    },
  });

  res.status(201).json({ createVendor, token });
});
// an endpoint forr vendor to login in
app.post("/vendor/login", async (req, res) => {
  const { email, password } = req.body;
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
    const comparePassword =await bcrypt.compare(password,vendor.password)
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "3d" });
     res.status(200).json({ token: token ,name:vendor.name});
});

// create product with  vendor
app.post("/product/:vendorId", isAuthenticated, async (req, res) => {
  const { vendorId } = req.params;
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
});

//create an endpoint for customer
app.post("/user", async (req, res) => {
  // const { vendorId } = req.params
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
});
app.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
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

    const isMatch = await bcrypt.compare(password,customer.password)
    console.log(isMatch)
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "3d" })
    res.status(201).json({token:token,name:customer.name})
});

//an endpoint for  transaction ,customer and product

app.post("/transaction/:productId/:customerId/:vendorId",isAuthenticated, async (req, res) => {
  const { customerId, productId, vendorId } = req.params;
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
});
// an endpoint to get each vendor and all products which the specified vendor have
app.get("/products/:vendorId", async (req, res) => {
  const { vendorId } = req.params;

  const product = await db.vendor.findUnique({
    where: { id: +vendorId },
    include: {
      product: true,
    },
  });
  res.status(200).json(product);
});
//an endpoint for all products
app.get("/product", async (req, res) => {
  const product = await db.product.findMany({
    include: {
      vendor: true,
    },
  });
  res.status(200).json(product);
});

//get each customer transaction including product ,the amount of which an item was product and sold.....
app.get("/transaction/:customerId", async (req, res) => {
  const { customerId } = req.params;
  const getuser = await db.transaction.findUnique({
    where: { id: +customerId },
    select: {
      pricesold: true,
      product: {
        select: {
          price: true,
        },
      },
      product: {
        select: {
          price: true,
        },
      },
    },
  });
  res.status(200).json(getuser);
});

app.get("/users/:vendorId", async (req, res) => {
  const { vendorId } = req.params;
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
});

app.listen(port, () => {
  console.log(`App listening on port ${port} `);
});
