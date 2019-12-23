module.exports = {
  events: require("./events"),
  subscribe(socket) {
    return event => {
      socket.join(event);
    };
  },
  publish(io, event, headers, data) {
    io.publish(event, headers, data);
  }
};
