import express from "express";
import { 
  getAllMovies, 
  getMovie, 
  getWinnerMovies, 
  getMoviesByLanguage, 
  getMoviesByFresh 
} from "../data/movies.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllMovies(pageSize, page));
});

router.get("/:id", async (req, res) => {
  const movie = await getMovie(req.params.id);
  res.json(movie);
});


router.get("/wins", async (req, res) => {
  try {
    const winnerMovies = await getWinnerMovies();
    res.json(winnerMovies);
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error'});
  }  
});

// - GET http://localhost:3000/api/movies/languages/German
router.get("/languages/:language", async (req, res) => {  
  const { language } = req.params;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  try{
    const moviesByLanguage = await getMoviesByLanguage(language, pageSize, page);
    res.json(moviesByLanguage);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({  message: "Error"});
  }  
});

// -GET http://localhost:3000/api/movies//tomatoes/fresh
router.get("/tomatoes/fresh", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 50;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  const moviesByFresh = await getMoviesByFresh(pageSize, page);
  res.json(moviesByFresh);
});

export default router;
