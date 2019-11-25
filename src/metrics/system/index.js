const { totalmem, cpus } = require("os");
const pidusage = require("pidusage");

module.exports = function(callback) {
  try {
    const interval = setInterval(() => {
      pidusage(process.pid, (err, { cpu, memory }) => {
        const cpuModel = cpus()[0].model;
        const mem = (memory / 1024 / 1024).toFixed(2);
        const totalMem = (totalmem / 1024 / 1024).toFixed(2);
        callback({ cpu, cpuModel, mem, totalMem });
      });
      pidusage.clear();
    }, 1 * 1000);

    // Don't keep Node.js process up
    interval.unref();
  } catch (error) {
    clearInterval(interval);
  }
};
