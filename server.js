const WebSocket = require("ws");
const express = require("express");
const app = express();
const server_port = 8080;
const server = new WebSocket.Server({ server: app.listen(server_port, () => { console.log("Server starting at port 8080"); }) });
const path = require("path");

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