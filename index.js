import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("🟢 Un client est connecté !");
  
  socket.on("play", () => {
    console.log("▶️ Lecture demandée !");
    io.emit("play"); // Diffuse à tous les clients
  });

  socket.on("disconnect", () => {
    console.log("🔴 Un client s'est déconnecté.");
  });
});

app.get("/", (req, res) => {
  res.send("🎵 Music Jam Server est en ligne !");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
