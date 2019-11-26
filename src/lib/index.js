const socketIo = require("socket.io");
const poll = require("../polling");

// Socket.io instance
let io;

function initEvents(queues) {
  io.on("connection", socket => {
    console.log("conectado");
  });
}

function init(server, queues) {
  if (!!!io) {
    // Create single Socket.io instance
    io = socketIo(server);
    // Init polling
    poll(io, queues);
    // Socket.io events
    initEvents(queues);
  }
}

module.exports = init;
