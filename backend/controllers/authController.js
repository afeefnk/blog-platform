const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// User Registration
exports.register = async (req, res) => {
  
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "Email already exists" });
    }
    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, user });
  } catch (err) {
    res.status(500).send("Server error");
  }
};





// User Login

exports.login = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    const payload = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, user });
  } catch (err) {
    res.status(500).send("Server error");
  }
};