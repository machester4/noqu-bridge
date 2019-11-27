const { jobTypes } = require("./constants");

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

// Fire when Queue event
async function getQueueInfo(queue) {
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
  return { name, header, body };
}

function getQueuesParsed(queues) {
  return Promise.all(queues.map(getQueueInfo));
}

module.exports = {
  getJobCounts,
  getLastTenJob,
  getQueuesParsed
};
