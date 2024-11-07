const express = require("express");
const router = express.Router();

const {
  authenticationMiddleware,
  adminMiddleware,
} = require("../middleware/auth");
const {
  click,
  blockUser,
  createPlayer,
  editPlayer,
  deletePlayer,
} = require("../controllers/game");

router.route("/click").post(authenticationMiddleware, click);
router
  .route("/block/:id")
  .post(authenticationMiddleware, adminMiddleware, blockUser);

router
  .route("/players")
  .post(authenticationMiddleware, adminMiddleware, createPlayer);
router
  .route("/players/:id")
  .put(authenticationMiddleware, adminMiddleware, editPlayer);
router
  .route("/players/:id")
  .delete(authenticationMiddleware, adminMiddleware, deletePlayer);

module.exports = router;
