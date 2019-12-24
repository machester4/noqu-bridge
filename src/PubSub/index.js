module.exports = {
  status: {
    ACTIVE: "active",
    WAITING: "waiting",
    COMPLETED: "completed",
    FAILED: "failed",
    DELAYED: "delayed",
    PAUSED: "paused"
  },
  events: {
    SYS_STATUS: () => "SYS_STATUS",
    QUEUES_STATUS: () => "QUEUES_STATUS",
    QUEUE_STATE: (queueName, state) => `${queueName}-${state}`.toUpperCase(),
    JOB_STATE: (jobId, state) => `${jobId}-${state}`.toUpperCase()
  },
  subscribe(socket) {
    return (event, ...args) => {
      // socket.join(event.apply(this, args));
      console.log("sub-", event.apply(this, args));
    };
  },
  publish(io) {
    return (event, args) => io.to(event).emit(event, args);
  },
  initDriven(io, queues) {
    Object.values(queues).forEach(queue => {
      Object.values(this.status).forEach(state => {
        queue.on(state, this.publish(io));
      });
    });
  }
};
