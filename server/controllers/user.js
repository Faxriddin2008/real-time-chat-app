const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const Users = require("../models/user");

const createToken = (_id) => {
  const jwt_key = process.env.JWT_SECRET_KEY;

  return jwt.sign({ _id }, jwt_key, { expiresIn: "30d" });
};

exports.registerUser = async (req, res) => {
  try {
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

    await user.save();

    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name, email, token });
  } catch (error) {
    res.status(500).json(error);
  }
};
