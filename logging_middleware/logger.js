import axios from "axios";

const LOG_URL = "http://20.207.122.201/evaluation-service/logs";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJkdXJnYXNyYXZhbnRoaV9wZWRkb2p1QHNybWFwLmVkdS5pbiIsImV4cCI6MTc3NzcwNDgxMiwiaWF0IjoxNzc3NzAzOTEyLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiM2M3Y2U0OTAtNGVlMC00MzQxLWE3YTEtZmVhYmVhYmM2YWRjIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZHVyZ2Egc3JhdmFudGhpIHBlZGRvanUiLCJzdWIiOiJiMWEzMmZmMy03NjY0LTRjMjQtYWFmNC0yYjExZjlhMmNiYzQifSwiZW1haWwiOiJkdXJnYXNyYXZhbnRoaV9wZWRkb2p1QHNybWFwLmVkdS5pbiIsIm5hbWUiOiJkdXJnYSBzcmF2YW50aGkgcGVkZG9qdSIsInJvbGxObyI6ImFwMjMxMTAwMTE1OTciLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiJiMWEzMmZmMy03NjY0LTRjMjQtYWFmNC0yYjExZjlhMmNiYzQiLCJjbGllbnRTZWNyZXQiOiJxUXFLclRYeEZBUHR0S2hKIn0.5NzIw_JOF25lWy2-428aCfgzRpor46wAwHKN-reTqr4";
export async function Log(stack, level, pkg, message) {
  try {
    await axios.post(
      LOG_URL,
      {
        stack: stack,
        level: level,
        package: pkg,
        message: message,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
}
