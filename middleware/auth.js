const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    console.log("Error in authHeader");

    return res
      .status(401)
      .json({ message: "Unauthorized. Please add valid token" });
  }

  const token = authHeader.split(" ")[1];
  console.log(token, "backend");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decoded;
    const user = await User.findById(id);
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: error.message });
  }
};

const adminMiddleware = (req, res, next) => {
  console.log(req.user, "user");

  if (req.user.role !== "admin")
    return res.status(403).json({ error: "Admin access required" });
  next();
};

module.exports = { authenticationMiddleware, adminMiddleware };
