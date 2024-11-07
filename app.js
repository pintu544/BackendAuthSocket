require("dotenv").config();
require("express-async-errors");
const express = require("express");
const User = require("./models/User");
const cors = require("cors");

const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*" } });

const port = process.env.PORT || 5000;
const connectDB = require("./db/connect");

const mainRouter = require("./routes/user");
const gameRouter = require("./routes/game");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/game", gameRouter);
app.use("/api/v1", mainRouter);

const start = async () => {
  try {
    const response = await connectDB(process.env.MONGO_URI);
    console.log(
      response.connections[0].host + " " + response.connections[0].port
    );
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

const userClickCounts = {};

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("initialize", async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found:", userId);
      return;
    }

    if (!userClickCounts[userId]) userClickCounts[userId] = user.clickCount;
    socket.emit("updateClickCount", userClickCounts[userId]);
  });

  socket.on("bananaClick", async (userId) => {
    if (userClickCounts[userId] !== undefined) {
      userClickCounts[userId]++;
    } else {
      userClickCounts[userId] = 1;
    }

    try {
      const user = await User.findById(userId);
      if (user) {
        user.clickCount = userClickCounts[userId];
        await user.save();
      }

      const players = await User.find().sort({ clickCount: -1 });
      io.emit("rankUpdate", players);
    } catch (error) {
      console.error("Failed to update click count in database:", error);
    }

    io.to(socket.id).emit("updateClickCount", userClickCounts[userId]);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
