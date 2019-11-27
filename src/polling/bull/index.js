const { QueueEvents } = require("bullmq");
const emit = require("../../lib/emitter");
const { jobTypes, pollTypes } = require("../../lib/constants");

// Poll Job
function sendJob(type, queue) {
  return async ({ jobId }) => {
    const job = await queue.getJob(jobId);
    const data = { type, queue: queue.name, job };
    console.log("polling ", type);
    emit(pollTypes.BULL, data);
  };
}

function bullPolling(queues) {
  queues.forEach(queue => {
    // Poll for job types
    let queueEvents = new QueueEvents(queue.name);
    jobTypes.forEach(type => {
      //queueEvents.removeAllListeners(type);
      queueEvents.addListener(type, sendJob(type, queue));
    });
  });
}

module.exports = bullPolling;
