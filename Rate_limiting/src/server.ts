import express, { Request, Response } from "express";
import { rateLimiter } from "./middleware/rateLimiter";


const app = express();
const PORT = 3000;

app.set("trust proxy", true);
// Apply middleware globally
app.use(rateLimiter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello! This route is rate limited (5 requests/min per IP).");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
