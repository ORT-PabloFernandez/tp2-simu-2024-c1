import express from "express";
import {
  getAllMovies,
  // getMovie,
  getAwardedMovies,
  getMoviesByLanguage,
} from "../data/movies.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllMovies(pageSize, page));
});

// router.get("/:id", async (req, res) => {
//   const movie = await getMovie(req.params.id);
//   res.json(movie);
// });

router.get("/awarded", async (req, res) => {
  try {
    const movies = await getAwardedMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/byLanguage/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  try {
    const result = await getMoviesByLanguage(
      req.body.languages,
      pageSize,
      page
    );
    res.json(result);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

export default router;
