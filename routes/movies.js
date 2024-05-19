import express from "express";
import { getAllMovies, getMovieById,getMoviesThatWonAwards,getMoviesByLanguages,getMoviesOrderByFresh,getComments,getUsers } from "../data/movies.js";
import {ObjectId} from 'mongodb'

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllMovies(pageSize, page));
});

router.get("/wonAwards", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  const movies = await getMoviesThatWonAwards(pageSize, page) 
  res.json(movies);
});

router.get("/languages", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const languages = (req.query.languages).split(",")

  const movies = await getMoviesByLanguages(pageSize, page, languages) 
  res.json(movies);
});

router.get("/fresh", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  const movies = await getMoviesOrderByFresh(pageSize, page) 
  res.json(movies);
});


router.get("/:id", async (req, res) => {
  //573a1391f29313caabcd7915
  const { id } = req.params
  const o_id = new ObjectId(id);
  const movie = await getMovieById(o_id) 
  res.json(movie);
});

router.get("/detail/:id", async (req, res) => {
  //573a1391f29313caabcd7915
  const { id } = req.params
  const o_id = new ObjectId(id);
  const movie = await getMovieById(o_id) 
  const comments = await getComments(o_id)
  const email = comments
  console.log(email)
  const users = await getUsers(email)
  res.json(comments);
});

export default router;
