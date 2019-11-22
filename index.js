const express = require("express");
const router = express.Router();
const path = require("path");

module.exports = function(app, prefix, authenticator) {
  const reactAppPrefix = "/noqu-board";
  if (prefix === reactAppPrefix) {
    throw new Error("Invalid prefix, please change it.");
  }
  router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/src/board/index.html"));
  });
  app.use(reactAppPrefix, express.static(path.join(__dirname, "/src/board")));
  app.use(prefix, router);
};
