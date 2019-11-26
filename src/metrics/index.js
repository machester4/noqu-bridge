// Metric getters
const systemMetric = require("./system");
const bullMetric = require("./bull");

// Metric senders
const { socketEvents } = require("../config/socket");

module.exports = function(queues) {
  // Send to from using socket io
  console.log("metrics with", queues.length);
  systemMetric(socketEvents["system-met"]);
  bullMetric(queues, socketEvents["bull-met"]);
};
