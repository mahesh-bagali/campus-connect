const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const dns = require("dns");
const Event = require("./Event");


app.use(cors());
app.use(express.json());
dns.setServers(['8.8.8.8']);

app.get("/", (req, res) => {
  res.send("Backend is working");
});

app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch {
    res.status(500).json({ message: "Unable to fetch events" });
  }
})

app.delete("/api/events/:eventId", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.eventId);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({
      message: "Event Deleted Successfully",
    });
  } catch {
    res.status(500).json({ message: "Unable to delete event" });
  }
});

app.post("/api/events", async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.json({
      message: "Event added successfully",
      event: newEvent,
    });
  } catch {
    res.status(400).json({ message: "Unable to add event" });
  }
});

app.put("/api/events/:eventId", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.eventId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch {
    res.status(400).json({ message: "Unable to update event" });
  }
});

async function startServer() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
}

startServer().catch((error) => {
  console.error("Unable to start server:", error.message);
  process.exit(1);
});