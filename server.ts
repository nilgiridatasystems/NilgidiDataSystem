import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    }
  });

  const PORT = 3000;

  // Simple store for recent messages (in-memory state)
  const messages: any[] = [];

  // Chat logic
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    
    // Send history to new user
    socket.emit("history", messages.slice(-20));

    socket.on("message", (data) => {
      const newMessage = {
        id: Date.now(),
        text: data.text,
        sender: data.sender || "Guest",
        timestamp: new Date().toISOString(),
      };
      
      messages.push(newMessage);
      if (messages.length > 100) messages.shift(); // Limit memory usage

      // Broadcast message to all clients
      io.emit("message", newMessage);
      
      // Auto-reply logic for simulation/support feel
      const lowerText = data.text.toLowerCase();
      if (lowerText.includes("hello") || lowerText.includes("hi") || lowerText.includes("help")) {
        const supportReply = {
          id: Date.now() + 1,
          text: "Thank you for contacting NDSPL Support. One of our engineers will be with you shortly. How can we help you today?",
          sender: "NDSPL Support",
          timestamp: new Date().toISOString(),
          isAutoReply: true
        };
        
        setTimeout(() => {
          socket.emit("message", supportReply);
        }, 1000);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
