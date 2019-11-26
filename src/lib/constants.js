const jobTypes = [
  "active",
  "waiting",
  "completed",
  "failed",
  "delayed",
  "paused"
];
const pollTypes = {
  SYSTEM: "system-met",
  BULL: "bull-met"
};

module.exports = {
  jobTypes,
  pollTypes
};
