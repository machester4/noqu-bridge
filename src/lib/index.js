const { totalmem, cpus } = require("os");
const pidusage = require("pidusage");
const { jobTypes } = require("./constants");

function sysUsage() {
  try {
    return new Promise((resolve, reject) => {
      pidusage(process.pid, (err, { cpu, memory }) => {
        const cpuModel = cpus()[0].model;
        const mem = (memory / 1024 / 1024).toFixed(2);
        const totalMem = (totalmem / 1024 / 1024).toFixed(2);
        const data = { cpu: cpu.toFixed(2), cpuModel, mem, totalMem };
        pidusage.clear();
        resolve(data);
      });
    });
  } catch (error) {
    reject(error);
  }
}

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
  return { name, statuses, jobs: [] };
}

function getQueues(queues) {
  return Promise.all(queues.map(getQueueInfo));
}

module.exports = {
  getJobCounts,
  getJobs,
  getQueueInfo,
  getQueues,
  sysUsage
};
