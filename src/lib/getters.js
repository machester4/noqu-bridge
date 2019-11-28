const { jobTypes } = require("./constants");

// For Header
async function getJobCounts(queue, type) {
  const result = await queue.getJobCounts(type);
  return result;
}

// For modify only first page of Queue
async function getJobs(queue, type, start = 0, end = 10) {
  const result = await queue.getJobs(type, start, end);
  return result;
}

// Fire when Queue event
async function getQueueInfo(queue) {
  const name = queue.name;
  const statuses = await Promise.all(
    jobTypes.map(type => getJobCounts(queue, type))
  );
  return { name, statuses };
}

function getQueues(queues) {
  return Promise.all(queues.map(getQueueInfo));
}

module.exports = {
  getJobCounts,
  getJobs,
  getQueueInfo,
  getQueues
};
