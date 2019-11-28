const express = require("express");
const router = express.Router();
const path = require("path");
const { getQueues, getJobs } = require("./src/lib/getters");
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
  router.get("/queues", async function(req, res) {
    const response = await getQueues(queues);
    res.json(response);
  });
  router.get("/:queue/:job_type", async function(req, res) {
    const { queue, job_type } = req.params;
    const { start, end } = req.query;
    const exist = queues.find(qu => qu.name === queue);
    if (exist) {
      const response = await getJobs(exist, job_type, start, end);
      res.json(response);
    }
  });

  // Auth validation
  //router.all(`/${prefix}/*`, authenticator)

  app.use(reactAppPrefix, express.static(path.join(__dirname, "/src/board")));
  app.use(prefix, router);

  initPolling(queues);
};
