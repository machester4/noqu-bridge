const express = require("express");
const router = express.Router();
const path = require("path");
const { getQueuesParsed } = require("./src/lib/getters");
const { initSocket, initPolling } = require("./src/lib");

module.exports = function(app, prefix, queues, authenticator) {
  const reactAppPrefix = "/noqu-board";
  if (prefix === reactAppPrefix) {
    throw new Error("Invalid prefix, please change it.");
  }
  // Board route
  router.get("/", function(req, res) {
    // Init polling to board
    initSocket(req.socket.server);
    // Response with noqu-board build
    res.sendFile(path.join(__dirname + "/src/board/index.html"));
  });
  // Services Routes
  router.get("/noqu/queues", async function(req, res) {
    const response = await getQueuesParsed(queues);
    res.json(response);
  });
  app.use(reactAppPrefix, express.static(path.join(__dirname, "/src/board")));
  app.use(prefix, router);
  initPolling(queues);
};
