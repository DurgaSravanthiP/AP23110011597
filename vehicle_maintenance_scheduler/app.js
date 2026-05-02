import express from "express";
import { Log } from "../logging_middleware/logger.js";
import axios from "axios";

const app = express();
const PORT = 8080;

const BASE_URL = "http://20.207.122.201/evaluation-service";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJkdXJnYXNyYXZhbnRoaV9wZWRkb2p1QHNybWFwLmVkdS5pbiIsImV4cCI6MTc3NzcwMjM0MywiaWF0IjoxNzc3NzAxNDQzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMmI4MzAwZDMtZTRiNy00YTA3LThlMDgtN2FhYWJjMDFmMmQwIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZHVyZ2Egc3JhdmFudGhpIHBlZGRvanUiLCJzdWIiOiJiMWEzMmZmMy03NjY0LTRjMjQtYWFmNC0yYjExZjlhMmNiYzQifSwiZW1haWwiOiJkdXJnYXNyYXZhbnRoaV9wZWRkb2p1QHNybWFwLmVkdS5pbiIsIm5hbWUiOiJkdXJnYSBzcmF2YW50aGkgcGVkZG9qdSIsInJvbGxObyI6ImFwMjMxMTAwMTE1OTciLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiJiMWEzMmZmMy03NjY0LTRjMjQtYWFmNC0yYjExZjlhMmNiYzQiLCJjbGllbnRTZWNyZXQiOiJxUXFLclRYeEZBUHR0S2hKIn0.U5Ux-n0_QbcXoF-3kppEOEgjQJbE4vGISx40tJbjd2I";
const headers = {
  Authorization: `Bearer ${TOKEN}`,
};

app.get("/", async (req, res) => {
  try {
    await Log("backend", "info", "route", "Scheduler API started");

    const depotsRes = await axios.get(`${BASE_URL}/depots`, { headers });

    const vehiclesRes = await axios.get(`${BASE_URL}/vehicles`, { headers });

    const depots = depotsRes.data.depots;
    const vehicles = vehiclesRes.data.vehicles;

    const maxHours = depots[0].MechanicHours;

    vehicles.sort((a, b) => b.Impact - a.Impact);

    let totalTime = 0;
    let totalImpact = 0;
    let selected = [];

    for (let v of vehicles) {
      if (totalTime + v.Duration <= maxHours) {
        selected.push(v);
        totalTime += v.Duration;
        totalImpact += v.Impact;
      }
    }

    await Log("backend", "info", "service", "Tasks selected successfully");

    res.json({
      selectedTasks: selected,
      totalTime: totalTime,
      totalImpact: totalImpact,
    });
  } catch (err) {
    console.log(err.message);
    await Log("backend", "error", "handler", "Error in scheduler");
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
