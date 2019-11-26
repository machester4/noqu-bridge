const express = require("express");
const router = express.Router();
const path = require("path");
const init = require("./src/lib");

module.exports = function(app, prefix, queues, authenticator) {
  const reactAppPrefix = "/noqu-board";
  if (prefix === reactAppPrefix) {
    throw new Error("Invalid prefix, please change it.");
  }
  router.get("/", function(req, res) {
    // Init polling to board
    init(req.socket.server, queues);
    // Response with noqu-board build
    res.sendFile(path.join(__dirname + "/src/board/index.html"));
  });
  app.use(reactAppPrefix, express.static(path.join(__dirname, "/src/board")));
  app.use(prefix, router);
};
