import cors from "cors";
import express from "express";
import helmet from "helmet";
import { apiRateLimit } from "./middleware/rateLimit.js";
import { router } from "./routes/index.js";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(apiRateLimit);

app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/v1", router);
