// Metric getters
const systemPolling = require("./system");
const bullPolling = require("./bull");

module.exports = function(io, queues) {
  // Send to board using socket io
  console.log("metrics with", queues.length);
  systemPolling(io);
  bullPolling(io, queues);
};
