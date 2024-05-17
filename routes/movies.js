import express from "express";
import { getAllMovies, getMovieById } from "../data/movies.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;

    res.json(await getAllMovies(pageSize, page));
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const movie = await getMovieById(id);
        if (!movie) {
            return res.status(401).json({ message: "No movies" });
        }

        return res.status(200).json(movie);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;
