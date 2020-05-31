const HOST = location.origin.replace(/^http/, "ws");
const socket = new WebSocket(HOST);
let name = "Anon";

const chat = document.querySelector(".box-chat");
const msg = document.querySelector(".box-message");
const boxName = document.querySelector(".box-name");

const btnSend = document.querySelector(".btn-send");
btnSend.addEventListener("click", () => {
  if (msg.value !== "") {
    const data = {
      name: boxName.value,
      msg: msg.value
    };
    socket.send(JSON.stringify(data));
    msg.value = "";
  }
});

const btnJoin = document.querySelector(".btn-join");
btnJoin.addEventListener("click", () => {
  // Remove modal
  if (boxName.value) {
    name = boxName.value;
    document.querySelector(".modal-container").remove();
  }
});

socket.addEventListener("message", event => {
  // Write to chatbox
  const data = JSON.parse(event.data);
  let div = document.createElement("div");
  let text = document.createTextNode(data.name + ": " + data.msg);
  div.appendChild(text);
  chat.appendChild(div);
});

document.addEventListener("keyup", event => {
  // Press ENTER to send a message
  if (event.code === "Enter" || event.code == "NumpadEnter") {
    btnSend.click();
  }
});