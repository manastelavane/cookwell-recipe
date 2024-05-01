/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import cardRouter from "./routes/cards.js";
import { Server } from "socket.io";
import { getMessages, saveMessage } from "./controllers/message.js";

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.removeHeader("ETag");
  next();
});
app.use("/user", userRouter);
app.use("/card", cardRouter);
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((error) => console.log(`${error} did not connect`));

const server = app.listen(PORT, () =>
  console.log("Hello! This is CookWell backend, listening on port - ", PORT)
);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CLIENT_URL,
  },
});
const CHAT_BOT = "ChatBot";
let chatRoom = "";
let allUsers = []; // All users in current chat room
// Listen for when the client connects via socket.io-client
io.on("connection", (socket) => {
  // console.log(`User connected ${socket.id}`);
  socket.on("send_message", (data) => {
    const { message, username, room, createdAt } = data;
    io.in(room).emit("receive_message", data);
    saveMessage(message, username, room, createdAt).catch((err) =>
      console.log(err)
    );
  });

  // Add a user to a room
  socket.on("join_room", (data) => {
    const { username, room } = data; // Data sent from client when join_room event emitted
    socket.join(room); // Join the user to a socket room
    getMessages(room)
      .then((last100Messages) => {
        socket.emit("last_100_messages", last100Messages);
      })
      .catch((err) => console.log(err));
    let createdAt = Date.now();
    // Send message to all users currently in the room, apart from the user that just joined
    socket.to(room).emit("receive_message", {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      createdAt,
    });
    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      createdAt,
    });
    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    let chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);
  });

  socket.on("leave_room", (data) => {
    const { username, room } = data;
    socket.leave(room);
    const createdAt = Date.now();
    // Remove user from memory
    allUsers = allUsers.filter((user) => user.id != socket.id);
    socket.to(room).emit("chatroom_users", allUsers);
    socket.to(room).emit("receive_message", {
      username: CHAT_BOT,
      message: `${username} has left the chat`,
      createdAt,
    });
    // console.log(`${username} has left the chat`);
  });

  socket.on("disconnect", () => {
    // console.log('User disconnected from the chat');
    const user = allUsers.find((user) => user.id == socket.id);
    if (user?.username) {
      //   allUsers = leaveRoom(socket.id, allUsers);
      allUsers = allUsers.filter((user) => user.room === socket.id);
      socket.to(chatRoom).emit("chatroom_users", allUsers);
      socket.to(chatRoom).emit("receive_message", {
        message: `${user.username} has disconnected from the chat.`,
      });
    }
  });
});
