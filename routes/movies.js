import express from "express";
import {
  getAllMovies,
  getMovie,
  getMoviesByLanguage,
  getMoviesOrderFresh,
} from "../data/movies.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const movies = await getAllMovies(pageSize, page);
  res.json(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await getMovie(req.params.id);
  res.json(movie);
});

router.get("/language/:language", async (req, res) => {
  const language = req.params.language;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  try {
    const movies = await getMoviesByLanguage(language, pageSize, page);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/tomatoes/freshOrden", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  const movies = await getMoviesOrderFresh(pageSize, page);
  res.json(movies);
});

export default router;
