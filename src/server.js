import Server from "socket.io";

// Create a websocket server with a port number
export default function startServer(store) {
  const io = new Server().attach(8090);

  // Emit 'state' event to clients when Redux state is changed and send the current state
  store.subscribe(() => io.emit("state", store.getState().toJS()));

  io.on("connection", (socket) => {
    // Emit 'state' event when client at first connected to server and send the current state
    socket.emit("state", store.getState().toJS());
    // When client emit 'action' send them to Redux store
    socket.on("action", store.dispatch.bind(store));
  });
}
