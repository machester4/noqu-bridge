// Libs
const socketIo = require("socket.io");

// Events

// *** Handlers ***
function handleSendSytemMetric(data) {
  // brodcast event system-met
  // console.log("brodcast system-met", data);
  io.emit("system-met", data);
}
function handleSendBullMetric(data) {
  // brodcast event bull-met
  console.log("brodcast bull-met", data);
  io.emit("bull-met", data);
}

const socketEvents = {
  "system-met": handleSendSytemMetric,
  "bull-met": handleSendBullMetric
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
