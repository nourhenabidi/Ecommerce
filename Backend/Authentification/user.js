const express = require ("express");
const { User } = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getEnvVar } = require('../functions/getEnvVar');

const route = express.Router();
var keys = ["keyboard cat"];

route.post("/login", async (req, res) => {
  try {
    console.log(req.body);

    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, getEnvVar("JWT_SECRET_KEY"), {
      expiresIn: "24h",
    });

    res.status(200).json({ token: token, user: user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Something went wrong, please try again later" });
  }
});

route.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    const token = jwt.sign({ id: user.id }, getEnvVar("JWT_SECRET_KEY"), {
      expiresIn: "24h",
    });

    res.status(200).json({ token: token, user: user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Something went wrong, please try again later" });
  }
});

module.exports = route;