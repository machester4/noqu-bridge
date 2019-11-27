const socketIo = require("socket.io");
const poll = require("../polling");

// Socket.io instance
let io;

function initEvents() {
  io.on("connection", socket => {
    console.log("conectado");
  });
}

function init(server) {
  if (!!!io) {
    // Create single Socket.io instance
    io = socketIo(server);
    // Socket.io events
    initEvents();
  }
}

module.exports = {
  io,
  initSocket: init,
  initPolling: poll
};
