import express from "express";
import {
  getAllMovies,
  getMovieById,
  getWinnerMovies,
  getMoviesByLanguage,
  getMoviesByFresh
} from "../data/movies.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllMovies(pageSize, page));
});

router.get("/winners", async (req, res) => {
  const movies = await getWinnerMovies();
  res.json(movies);
});

router.get("/language/:language", async (req, res) => {
  const language = req.params.language;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  const movies = await getMoviesByLanguage(language, pageSize, page);
  res.json(movies);
});

router.get("/fresh", async (req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 100;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const movies = await getMoviesByFresh(pageSize, page);
    res.json(movies);
  } catch (error) {
    console.error("Error fetching fresh movies:", error);
    res.status(500).json({ error: "Failed to fetch fresh movies" });
  }
});


router.get("/:id", async (req, res) => {
  const movie = await getMovieById(req.params.id);
  res.json(movie);
});

export default router;
