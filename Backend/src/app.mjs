import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.mjs";
import feedbackRoutes from "./routes/feedback.routes.mjs";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/feedbacks", feedbackRoutes);

app.get("/", (_req, res) => {
    res.status(200).json({message: "Server is running..."});
});

export default app;
