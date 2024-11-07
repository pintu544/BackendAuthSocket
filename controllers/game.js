const User = require("../models/User");

const click = async (req, res) => {
  const { id: userId } = req.user;
  const user = await User.findById(userId);
  user.clickCount += 1;
  await user.save();

  console.log("Emitting clickCountUpdated:", {
    userId,
    clickCount: user.clickCount,
  });

  req.io.emit("clickCountUpdated", { userId, clickCount: user.clickCount });
  res.json({ clickCount: user.clickCount });
};

const blockUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  user.isActive = !user.isActive;
  await user.save();

  req.io.emit("userStatusUpdated", { id, isActive: user.isActive });
  res.json({ message: "Player status updated" });
};

const createPlayer = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newPlayer = await new User({
      email,
      password,
      role: "player",
      name,
    }).save();

    const selectedFields = {
      _id: newPlayer._id,
      name: newPlayer.name,
      email: newPlayer.email,
    };

    res.json({
      message: "Player created successfully",
      player: selectedFields,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const editPlayer = async (req, res) => {
  const { id } = req.params;
  const { email, password, clickCount } = req.body;
  try {
    const player = await User.findById(id);
    if (!player) return res.status(404).json({ error: "Player not found" });

    if (email) player.email = email;
    if (password) player.password = password;

    if (clickCount !== undefined) player.clickCount = clickCount;

    await player.save();
    res.json({ message: "Player updated successfully", player });
  } catch (err) {
    res.status(500).json({ error: "Error updating player" });
  }
};

const deletePlayer = async (req, res) => {
  const { id } = req.params;
  try {
    const player = await User.findByIdAndDelete(id);
    if (!player) return res.status(404).json({ error: "Player not found" });
    res.json({ message: "Player deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting player" });
  }
};

module.exports = {
  click,
  blockUser,
  createPlayer,
  editPlayer,
  deletePlayer,
};
