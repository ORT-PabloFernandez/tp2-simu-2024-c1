import express from "express";
import { getAllMovies, getMovieById, getAwardWinnerMovies } from "../data/movies.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllMovies(pageSize, page));
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await getMovieById(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: "Pelicula no encontrada" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/awardsWinners", async (req, res) =>{
  res.json(await getAwardWinnerMovies());
});



export default router;
