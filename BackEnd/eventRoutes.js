// eventRoutes.js
import express from "express";
import db from "./dbConfig.js";


const router = express.Router();

// ✅ Route to handle event form submission
router.post("/admin/add/event", (req, res) => {
  const { eventname, venue, eventdatetime, link, hostname } = req.body;

  if (!eventname || !venue || !eventdatetime || !link || !hostname) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sqlInsert = `
    INSERT INTO event (EventName, Venue, EventDateTime, Link, hostname) 
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sqlInsert, [eventname, venue, eventdatetime, link, hostname], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(201).json({ message: "Event added successfully" });
    }
  });
});


// Add this GET route to fetch events
router.get("/events", (req, res) => {
  const sqlSelect = `select eventid, link, eventname, venue, eventdatetime, hostname from event`;

  db.query(sqlSelect, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
});

export default router;
