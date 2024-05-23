import express from "express";
import { getAllMovies, getMovieById, getMovieByAwards, getMovieByLanguage, getMovieByFreshRanking } from "../data/movies.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 5;
  const page = req.query.page ? parseInt(req.query.page) : 2;
  res.json(await getAllMovies(pageSize, page));
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  res.json(await getMovieById(id));
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

router.get("/ranking/", async (req, res) => {
  try {
    res.json(await getMovieByFreshRanking());
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
})

export default router;
