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

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Users.findOne({ email });
    if (!user) return res.status(400).json("Login or password is incorrect!");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).json("Login or password is incorrect!");
    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, name: user.name, email, token });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.findUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await Users.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};
