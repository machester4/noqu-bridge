const { QueueEvents } = require("bullmq");
const { jobTypes, pollTypes } = require("../../lib/constants");

// For Header
async function getJobCounts(queue, type) {
  const result = await queue.getJobCounts(type);
  return result;
}

// For modify only first page of Queue
async function getLastTenJob(queue, type) {
  const result = await queue.getJobs(type, 0, 10);
  return result;
}

// Poll Job
function sendJob(io, type, queue) {
  const data = { type, queue: queue.name };
  console.log("polling ", type);
  io.emit(pollTypes.BULL, data);
}

// Fire when Queue event
async function getQueueInfo(io, type, queue) {
  const name = queue.name;
  const header = await Promise.all(
    jobTypes.map(type => getJobCounts(queue, type))
  );
  const jobs = await Promise.all(
    jobTypes.map(type => getLastTenJob(queue, type))
  );
  const body = jobTypes.reduce(
    (prevObj, job, i) => ({ ...prevObj, [job]: jobs[i] }),
    {}
  );
  const data = { name, header, body };
  io.emit(pollTypes.BULL, data);
}

function bullPolling(io, queues) {
  queues.forEach(queue => {
    // Poll for job types
    let queueEvents = new QueueEvents(queue.name);
    jobTypes.forEach(type => {
      queueEvents.on(type, _ => sendJob(io, type, queue));
    });
  });
}

module.exports = bullPolling;
