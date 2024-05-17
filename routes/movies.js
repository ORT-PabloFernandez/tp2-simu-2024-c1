import express from "express";
import { getAllMovies, getMovie, getMoviesByLanguage, getWinningMovies, getMoviesByOrderTomatoes,  } from "../data/movies.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllMovies(pageSize, page));
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await getMovie(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/awards/winners",async (req, res) => {
  try {
    const movies = await getWinningMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/language/:language",async (req, res) => {
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

router.get("/order/tomatoes",async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  try {
    const movies = await getMoviesByOrderTomatoes(pageSize, page);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;
