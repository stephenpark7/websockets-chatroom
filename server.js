const express = require("express");
const app = express();
const WebSocket = require("ws");
const path = require("path");

const SERVER_PORT = process.env.PORT || 3000;
const server = new WebSocket.Server({ 
  server: app.listen(SERVER_PORT, () => { 
    console.log("Server starting at port " + SERVER_PORT); 
  }) 
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

server.on("connection", socket => {
  socket.on("message", message => {
    server.clients.forEach(client => {
      client.send(message);
    })
  });
});