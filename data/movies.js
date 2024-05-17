import getConnection from "./conn.js";
import { ObjectId } from "mongodb";

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

async function getMovie(id) {
  const connectiondb = await getConnection();
  const movie = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .findOne({ _id: new ObjectId(id) });
  return movie;
}

async function getWinningMovies(pageSize, page) {
  const connectiondb = await getConnection();
  const winningMovies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({"awards.wins": { $gt: 0 } }, //en mongodb se usa $gt para decir que algo sea greater than
    { projection: { title: 1, poster: 1, plot: 1 }}) //projection para ver que campos tienen que incluir
    .toArray();

  return winningMovies;
}

async function getMoviesByLanguage(language, pageSize, page) {
  const connectiondb = await getConnection();
  const moviesByLanguage = await connectiondb
  .db(DATABASE)
  .collection(MOVIES)
  .find({ languages: language })
  .limit(pageSize)
  .skip(pageSize * page)
  .toArray();

  return moviesByLanguage;
}

async function getMoviesByOrderTomatoes(pageSize, page) {
  const connectiondb = await getConnection();
  const moviesByOrder = await connectiondb
  .db(DATABASE)
  .collection(MOVIES)
  .find()
  .sort({"tomatoes.fresh": -1}) 
  .skip(pageSize * page)
  .limit(pageSize)
  .toArray();

  return moviesByOrder;
}

export { getAllMovies, getMovie, getWinningMovies, getMoviesByLanguage, getMoviesByOrderTomatoes};

