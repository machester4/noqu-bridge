const express = require("express");
const router = express.Router();
const path = require("path");
const sender = require("./src/metrics");
const { init } = require("./src/config/socket");

module.exports = function(app, prefix, queues, authenticator) {
  const reactAppPrefix = "/noqu-board";
  if (prefix === reactAppPrefix) {
    throw new Error("Invalid prefix, please change it.");
  }
  router.get("/", function(req, res) {
    // Call socket singleton
    init(req.socket.server);
    // Init metric sender
    sender(queues);
    // Response with noqu-board build
    res.sendFile(path.join(__dirname + "/src/board/index.html"));
  });
  app.use(reactAppPrefix, express.static(path.join(__dirname, "/src/board")));
  app.use(prefix, router);
};
