const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let userCount = 0;

io.on("connection", (socket) => {
  userCount++;
  console.log("ユーザーが接続しました", socket.id);

  // 接続時に全クライアントに現在の接続数を送信
  io.emit("count", userCount);

  // メッセージを受信したら全クライアントにブロードキャスト
  socket.on("message", (data) => {
    console.log("メッセージを受信:", data);
    io.emit("message", data); // 送信者含む全員に送信
  });

  socket.on("disconnect", () => {
    userCount--;
    console.log("ユーザーが切断しました", socket.id);
    io.emit("count", userCount);
  });
});

http.listen(5000, () => {
  console.log("サーバーが起動しました: http://localhost:5000");
});
