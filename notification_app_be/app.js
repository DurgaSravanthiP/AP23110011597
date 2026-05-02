import express from "express";
import { Log } from "../logging_middleware/logger.js";

const app = express();
const PORT = 3001;

app.use(express.json());

// GET notifications
app.get("/notifications", async (req, res) => {
  try {
    await Log("backend", "info", "route", "Fetching notifications");

    const notifications = [
      {
        id: "1",
        type: "Placement",
        message: "TCS hiring",
        timestamp: new Date(),
        isRead: false
      },
      {
        id: "2",
        type: "Event",
        message: "Tech Fest",
        timestamp: new Date(),
        isRead: false
      }
    ];

    res.json({ notifications });

  } catch (err) {
    await Log("backend", "error", "handler", "Error fetching notifications");
    res.status(500).json({ error: "Something went wrong" });
  }
});

// POST notification
app.post("/notifications", async (req, res) => {
  try {
    await Log("backend", "info", "route", "Creating notification");

    const { type, message } = req.body;

    res.json({
      message: "Notification created",
      data: { type, message }
    });

  } catch (err) {
    await Log("backend", "error", "handler", "Error creating notification");
    res.status(500).json({ error: "Something went wrong" });
  }
});

// PUT mark as read
app.put("/notifications/:id", async (req, res) => {
  try {
    await Log("backend", "info", "route", "Mark notification as read");

    res.json({
      message: `Notification ${req.params.id} marked as read`
    });

  } catch (err) {
    await Log("backend", "error", "handler", "Error updating notification");
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Notification service running on http://localhost:${PORT}`);
});