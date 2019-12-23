const socketIo = require("socket.io");
const { subscribe, publish, events } = require("../PubSub");

// Socket.io instance
let io;

function initEvents(queues) {
  io.on("connection", socket => {
    Object.values(events).forEach(event => {
      event !== events.QUEUES_JOBS && subscribe(socket, event);
    });
    socket.on("subscribe", subscribe(socket));
    console.log("conectado");
  });
}

function init(server, queues) {
  if (!!!io) {
    // Create single Socket.io instance
    io = socketIo(server);
    // Socket.io events
    initEvents(queues);
  }
}

module.exports = init;
