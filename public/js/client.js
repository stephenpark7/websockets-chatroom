const socket = new WebSocket("ws://localhost:8080");

const chat = document.querySelector(".box-chat");
const msg = document.querySelector(".box-message");
const btn = document.querySelector(".btn-send");
btn.addEventListener("click", () => {
    socket.send(msg.value);
    msg.value = "";
});

socket.addEventListener("open", () => {
    //console.log("Socket opened.");
    //socket.send("Hello World!");
});

socket.addEventListener("message", event => {
    // Write to chatbox
    let div = document.createElement("div");
    let text = document.createTextNode("Anon: " + event.data);
    div.appendChild(text);
    chat.appendChild(div);
});

document.addEventListener("keyup", event => {
    // Press ENTER to send a message
    if (event.code === "Enter") {
        btn.click();
    }
});