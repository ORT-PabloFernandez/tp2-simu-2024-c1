import express from "express";
import {
  getAllMovies,
  getMovie,
  getAwardWinningMovies,
  getMoviesByLanguage,
  getAllMoviesByFreshRating,
} from "../data/movies.js";

const router = express.Router();

router.get("/language", async (req, res) => {
  try {
    const language = req.query.lang;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const movies = await getMoviesByLanguage(language, pageSize, page);
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving movies by language.' });
  }
});

router.get("/awards/winners", async (req, res) => {
  try {
    const awardWinners = await getAwardWinningMovies();
    res.json(awardWinners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving award-winning movies.' });
  }
});

router.get("/ranking/fresh/all", async (req, res) => {
  try {
    const movies = await getAllMoviesByFreshRating();
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving movies by fresh rating.' });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await getMovie(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving the movie.' });
  }
});

router.get("/", async (req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const movies = await getAllMovies(pageSize, page);
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving movies.' });
  }
});

export default router;