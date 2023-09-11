const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const Users = require("../models/user");
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await Users.findOne({ email });
  if (user) return res.status(400).json("User already exist with this email");
  if (!validator.isEmail(email))
    return res.status(400).json("Email is not valid");
  if (!validator.isStrongPassword(password))
    return res.status(400).json("Password is not strong enough");

  user = await Users.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });
};
