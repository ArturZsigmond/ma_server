import express from "express";
import "dotenv/config";
import cors from "cors";
import buildsRouter from "./routes/builds.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/builds", buildsRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("🚀 Server listening on port", PORT);
});
