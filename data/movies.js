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

export async function getMovie(id) {
  const connectiondb = await getConnection();

  const movie = await connectiondb
  .db(DATABASE)
  .collection(MOVIES)
  .findOne({ _id: new ObjectId(id) });

  return movie;
}

//pantalla para mostrar solo las películas ganadoras de al menos un premio. 
//Necesitamos que desarrolles el endpoint respectivo. 
//Solo necesitan el título, el poster y el resumen de la reseña (plot)
export async function getWinnerMovies() {
  const connectiondb = await getConnection();

  const filter = { "awards.wins": { $gt: 0 } };

  const projection = { title: 1, poster: 1, plot: 1, _id: 0};

  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find(filter)
    .project(projection)
    .toArray();

  return movies;
}


// - GET http://localhost:3000/api/movies/languages/German
export async function getMoviesByLanguage(language, pageSize = 10, page = 0) {
  const connectiondb = await getConnection();

  const filter = { languages: language };

  const moviesByLanguage = await connectiondb
  .db(DATABASE)
  .collection(MOVIES)
  .find(filter)
  .limit(pageSize)
  .skip(pageSize * page)
  .toArray();

  return moviesByLanguage;
}

// -GET http://localhost:3000/api/movies//tomatoes/fresh
export async function getMoviesByFresh(pageSize, page) {
  const connectiondb = await getConnection();

  const moviesByFresh = await connectiondb
  .db(DATABASE)
  .collection(MOVIES)
  .find({ 'tomatoes.fresh': { $exists: true } })
  .sort({ 'tomatoes.fresh': -1 })
  .limit(pageSize)
  .skip(pageSize * page)
  .toArray();

  return moviesByFresh; 
}

export { getAllMovies };
