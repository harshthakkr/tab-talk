import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer();

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.broadcast.emit("message", `${socket.id} just joined!`);

  socket.on("message", (data) => {
    console.log(`Message from ${socket.id}:`, data);
    socket.broadcast.emit("message", data);
  });

  socket.on("disconnect", (reason) => {
    console.log(`Socket ${socket.id} disconnected: ${reason}`);
  });

  socket.conn.on("upgrade", () => {
    console.log(
      `Socket ${socket.id} upgraded to: ${socket.conn.transport.name}`
    );
  });
});

server.listen(4000, () => {
  console.log(`Server is listening on port: ${4000}`);
});
