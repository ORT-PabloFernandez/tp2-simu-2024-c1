import { ObjectId } from "mongodb";
import getConnection from "./conn.js";
const DATABASE = "sample_mflix";
const MOVIES = "movies";

async function getAllMovies(pageSize, page) {
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({})
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return movies;
}

async function getMovieById(Id) {
  const connectiondb = await getConnection();
  const movies = await connectiondb;
  const movie = await movies
    .db(DATABASE)
    .collection(MOVIES)
    .findOne({ _id: new ObjectId(Id) });
  return movie;
}

async function getWinnerMovies() {
  const connectiondb = await getConnection();
  const winnerMovies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ "awards.wins": { $gt: 0 } })
    .project({ title: 1, poster: 1, plot: 1, "awards.wins": 1, _id: 0 })
    .toArray();
  return winnerMovies;
}

async function getMoviesByLanguage(language, pageSize, page) {
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ languages: language })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return movies;
}

async function getMoviesByFresh(pageSize, page) {
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({})
    .sort({ "tomatoes.fresh": -1 })
    .limit(pageSize)
    .skip(pageSize * page)
    .project({ title: 1, poster: 1, plot: 1, "tomatoes.fresh": 1, _id: 0 })
    .toArray();
  return movies;

}

export {
  getAllMovies,
  getMovieById,
  getWinnerMovies,
  getMoviesByLanguage,
  getMoviesByFresh,
};
