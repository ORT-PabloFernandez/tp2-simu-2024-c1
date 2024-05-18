import express from "express";
import {
    getAllMovies,
    getMovieById,
    getMoviesSortedByFresh,
    filteredMovies,
    getMoviesWithAtLeastOneAward
} from "../data/movies.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;

    res.json(await getAllMovies(pageSize, page));
});

router.get("/sort", async (req, res) => {
    try {
        let { pageSize, page } = req.query;
        pageSize = pageSize ? parseInt(pageSize) : 10;
        page = page ? parseInt(req.query.page) : 0;

        const sortedMovies = await getMoviesSortedByFresh(pageSize, page);
        return res.status(200).json(sortedMovies);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get("/filtered", async (req, res) => {
    try {
        const { language } = req.query
        if (!language) {
            return res.status(400).json({ message: "Must provide a language" });
        }

        let { pageSize, page } = req.query;
        pageSize = pageSize ? parseInt(pageSize) : 10;
        page = page ? parseInt(req.query.page) : 0;

        const movies = await filteredMovies(language, pageSize, page);
        return res.status(200).json(movies);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get("/awards", async (req, res) => {
    try {
        let { pageSize, page }  = req.query;
        pageSize = pageSize ? parseInt(pageSize) : 10;
        page = page ? parseInt(req.query.page) : 0;

        const awardsMovies = await getMoviesWithAtLeastOneAward(pageSize, page);
        return res.status(200).json(awardsMovies);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const movie = await getMovieById(id);
        if (!movie) {
            return res.status(404).json({ message: "No movies were found" });
        }

        return res.status(200).json(movie);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;
