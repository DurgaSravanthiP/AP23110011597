import axios from "axios";

const LOG_URL = "http://20.207.122.201/evaluation-service/logs";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJkdXJnYXNyYXZhbnRoaV9wZWRkb2p1QHNybWFwLmVkdS5pbiIsImV4cCI6MTc3NzcwMjM0MywiaWF0IjoxNzc3NzAxNDQzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMmI4MzAwZDMtZTRiNy00YTA3LThlMDgtN2FhYWJjMDFmMmQwIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZHVyZ2Egc3JhdmFudGhpIHBlZGRvanUiLCJzdWIiOiJiMWEzMmZmMy03NjY0LTRjMjQtYWFmNC0yYjExZjlhMmNiYzQifSwiZW1haWwiOiJkdXJnYXNyYXZhbnRoaV9wZWRkb2p1QHNybWFwLmVkdS5pbiIsIm5hbWUiOiJkdXJnYSBzcmF2YW50aGkgcGVkZG9qdSIsInJvbGxObyI6ImFwMjMxMTAwMTE1OTciLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiJiMWEzMmZmMy03NjY0LTRjMjQtYWFmNC0yYjExZjlhMmNiYzQiLCJjbGllbnRTZWNyZXQiOiJxUXFLclRYeEZBUHR0S2hKIn0.U5Ux-n0_QbcXoF-3kppEOEgjQJbE4vGISx40tJbjd2I";
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
