import express from "express";
import {
  getAllMovies,
  getMovie,
  getAwardWinningMovies,
  getMoviesByLanguage,
  getAllMoviesByFreshRating,
} from "../data/movies.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize
    ? parseInt(req.query.pageSize)
    : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllMovies(pageSize, page));
});

router.get("/:id", async (req, res) => {
  const movie = await getMovie(req.params.id);
  res.json(movie);
});

router.get("/awards/winners", async (req, res) => {
  const awardWinners = await getAwardWinningMovies();
  res.json(awardWinners);
});

router.get("/language/:lang", async (req, res) => {
  const language = req.params.lang;
  const pageSize = req.query.pageSize
    ? parseInt(req.query.pageSize)
    : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const movies = await getMoviesByLanguage(language, pageSize, page);
  res.json(movies);
});

router.get("/ranking/fresh/all", async (req, res) => {
  const movies = await getAllMoviesByFreshRating();
  res.json(movies);
});

export default router;