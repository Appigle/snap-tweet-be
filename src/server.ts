import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import connectDB from "./config/db";

import authRoutes from "./routes/authRoutes";
import tweetRoutes from "./routes/tweetRoutes";

dotenv.config();

const app: Express = express();

app.use(
  cors({
    origin: "https://delicate-tarsier-b4e7e0.netlify.app",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());

connectDB(); // Ensure this is mocked in tests

app.use("/api/auth", authRoutes);
app.use("/api", tweetRoutes);

// if (process.env.NODE_ENV !== 'test') {
//   const PORT: number = parseInt(process.env.PORT || '5000', 10);
//   app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
// }
app.get("/", (req, res) => {
  res.send("Hello from Express on Vercel!");
});
export default app; // Ensure the app is exported for testing
