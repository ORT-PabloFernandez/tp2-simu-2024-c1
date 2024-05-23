import express from "express";
import { getAllMovies, getWinMovie, getMoviesLanguage, getMoviesRanking } from "../data/movies.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 5;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    res.json(await getAllMovies(pageSize, page));
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


router.get('/win-movies', async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 5;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  res.json(await getWinMovie(pageSize, page));
});

router.get('/languages/:language', async (req, res) => {
  try {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 5;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const language = req.params.language;
  res.json(await getMoviesLanguage(pageSize, page, language));
} catch (error) {
  res.status(500).json({ message: 'Error al obtener las películas por idioma' });
}
});

router.get('/ranking', async (req, res) => {
  try {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  res.json(await getMoviesRanking(pageSize, page));
} catch (error) {
  res.status(500).send({ message: error.message });
}
});

export default router;
