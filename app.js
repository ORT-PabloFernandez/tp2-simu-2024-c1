import "dotenv/config";
import express from "express";
import morgan from "morgan";

import moviesRouter from "./routes/movies.js";
import { default as awardsRouter } from "./routes/awards.js";

const PORT = process.env.PORT ?? 3001;
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/movies", moviesRouter);
app.use("/api/awards", awardsRouter);

app.listen(PORT, () => {
    console.log(`Server running in http//localhost:${PORT}`);
});
