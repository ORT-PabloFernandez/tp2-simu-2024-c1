import express from "express";
import { getAllMovies, getMovieById, getMovieByAwards, getMovieByLanguage, getMoviesByFreshRanking, getUserComments } from "../data/movies.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 5;
  const page = req.query.page ? parseInt(req.query.page) : 2;
  res.json(await getAllMovies(pageSize, page));
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await getMovieById(id);
    res.json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/awards/:qty?", async (req, res) => {
  const QTY = req.params.qty ? parseInt(req.params.qty) : 1;

  if (QTY < 1) {
    res.status(400).json({ message: "La cantidad de premios debe ser mayor a 0" });
    return;
  }

  res.json(await getMovieByAwards(QTY));
})

router.get("/languages/:language", async (req, res) => {
  const language = req.params.language;

  if (!language) {
    res.status(400).json({ message: "Debe ingresar un idioma" });
    return;
  }

  res.json(await getMovieByLanguage(language));
})

router.get("/ranking", async (req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;

    res.json(await getMoviesByFreshRanking(pageSize, page));
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/comments/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    res.send(await getUserComments(id))
  } catch (e) {
    res.status(500).send({ message: err.message });
  }
})

export default router;
