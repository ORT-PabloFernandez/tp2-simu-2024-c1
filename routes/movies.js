import express from "express";
import { getAllMovies, getMovieById, getPeliculasGanadoras, getMovieByTitle, getMoviesByLanguage, getMoviesByFreshScore } from "../data/movies.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllMovies(pageSize, page));
});

router.get("/language/:language", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  try {
    const movies = await getMoviesByLanguage(req.params.language, pageSize, page);
    res.json(movies);
  } catch (error) {
    res.status(500).send({ message: "Hubo un error al devolver la pelicula", error });
  }
});

router.get("/fresh", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  try {
    const movies = await getMoviesByFreshScore(pageSize, page);
    res.json(movies);
  } catch (error) {
    res.status(500).send({ message: "Hubo un error al devolver la pelicula", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await getMovieById(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).send({ message: "Pelicula no encontrada" });
    }
  } catch (error) {
    res.status(500).send({ message: "Hubo un error al devolver la pelicula", error });
  }
});

router.get("/awards/winners", async (req, res) => {
  const peliculasGanadoras = await getPeliculasGanadoras();
  res.json(peliculasGanadoras);
});



//Este se creo ya que por el ID no me devolvia resultados
router.get("/title/:title", async (req, res) => {
  try {
    const movie = await getMovieByTitle(req.params.title);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).send({ message: "Pelicula no encontrada" });
    }
  } catch (error) {
    res.status(500).send({ message: "Hubo un error al devolver la pelicula", error });
  }
});



export default router;
