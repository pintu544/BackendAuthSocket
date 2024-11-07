const express = require("express");
const router = express.Router();

const {
  login,
  register,
  dashboard,
  getAllUsers,
} = require("../controllers/user");
const { authenticationMiddleware } = require("../middleware/auth");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/dashboard").get(authenticationMiddleware, dashboard);
router.route("/users").get(authenticationMiddleware, getAllUsers);

module.exports = router;
