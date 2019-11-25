// Libs
const socketIo = require("socket.io");

// Events

// *** Handlers ***
function handleSendSytemMetric(data) {
  // brodcast event system-met
  console.log("brodcast system-met", data);
  io.emit("system-met", data);
}
function handleSendBullMetric() {
  // brodcast event bull-met
}

const socketEvents = {
  "system-met": handleSendSytemMetric
};

let io;

function initListeners() {
  io.on("connection", socket => {
    console.log("conectado");
  });
}

function init(server) {
  if (!!!io) {
    io = socketIo(server);
    initListeners();
  }
}

module.exports = {
  socketEvents,
  init
};
