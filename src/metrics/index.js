// Metric getters
const systemMetric = require("./system");

// Metric senders
const { socketEvents } = require("../config/socket");

module.exports = function() {
  // Send to from using socket io

  systemMetric(socketEvents["system-met"]);
};
