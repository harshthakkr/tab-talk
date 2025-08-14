import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer((req, res) => {
  res.end("Received request from " + req.url);
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.broadcast.emit("message", `${socket.id} just joined!`);
  socket.on("message", (data) => {
    socket.broadcast.emit("message", data);
  });
});

server.listen(4000, () => {
  console.log(`Server is listening on port: ${4000}`);
});
