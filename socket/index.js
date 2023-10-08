const { Server } = require("socket.io");
const io = new Server({ cors: "http://localhost:5173/" });

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("new connection", socket.id);
});

io.listen(3000);
