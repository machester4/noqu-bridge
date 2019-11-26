const { jobTypes } = require("../../config/constants");

// For Header
async function getJobCounts(queue, type) {
  console.log(jobTypes);
  const result = await queue.getJobCounts(type);
  return result;
}

// For modify only first page of Queue
async function getLastTenJob(queue, type) {
  const result = await queue.getJobs(type, 0, 10);
  return result;
}

// Fire when Queue event
async function getQueueInfo(queue) {
  const name = queue.name;
  const header = await Promise.all(
    jobTypes.map(type => getJobCounts(queue, type))
  );
  const body = await Promise.all(
    jobTypes.map(type => getLastTenJob(queue, type))
  );
  return { name, header, body };
}

function bullMetric(queues, callBack) {
  queues.forEach(queue => {
    // Add Listeners to Queue
    jobTypes.forEach(type =>
      queue.on(type, () => getQueueInfo(queue).then(callBack))
    );
    // Get initial info of Queue and send by socket
    getQueueInfo(queue).then(callBack);
  });
}

module.exports = bullMetric;
