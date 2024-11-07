const jwt = require("jsonwebtoken");
const User = require("../models/User");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message:
          "Bad request. Please add email and password in the request body",
      });
    }

    let foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
      const isMatch = await foundUser.comparePassword(password);

      if (isMatch) {
        const token = jwt.sign(
          { id: foundUser._id, role: foundUser.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "30d",
          }
        );

        return res.status(200).json({
          message: "user logged in",
          token,
          role: foundUser.role,
          id: foundUser._id,
        });
      } else {
        return res.status(400).json({ message: "Bad password" });
      }
    } else {
      return res.status(404).json({ message: "Register First" });
    }
  } catch (error) {
    console.log("error", error);
  }
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    message: `Hello, ${req.user.name}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

const getAllUsers = async (req, res) => {
  let users = await User.find({}).sort({ clickCount: -1 });

  return res.status(200).json({ users });
};

const register = async (req, res) => {
  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser === null) {
    let { username, email, password, role } = req.body;
    if (username.length && email.length && password.length && role.length) {
      const person = new User({
        name: username,
        email: email,
        password: password,
        role: role,
      });
      await person.save();
      return res.status(201).json({ person });
    } else {
      return res
        .status(400)
        .json({ message: "Please add all values in the request body" });
    }
  } else {
    return res.status(400).json({ message: "Email already in use" });
  }
};

module.exports = {
  login,
  register,
  dashboard,
  getAllUsers,
};
