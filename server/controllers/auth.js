const AuthSchema = require("../models/auth.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const user = await AuthSchema.findOne({ email });
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Tüm alanlar zorunludur" });
    }

    if (user) {
      return res.status(400).json({ msg: "Böyle bir kullanıcı zaten var" });
    }

    if (password.length < 6) {
      return res
        .status(500)
        .json({ msg: "Şifreniz 6 karakterden küçük olmamalı!" });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await AuthSchema.create({
      username,
      email,
      password: passwordHash,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      status: "OK",
      newUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthSchema.findOne({ email });
    // if (!email || !password) {
    //   return res.status(400).json({ msg: "Email ve şifre zorunludur" });
    // }

    if (!user) {
      return res.status(400).json({ msg: "Kullanıcı bulunamadı" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ msg: "Şifre hatalı" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: "OK",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = { register, login };
