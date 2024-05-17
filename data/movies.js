import getConnection from "./conn.js";
import { ObjectId } from "mongodb"; // Importa ObjectId para convertir el string en un ObjectId de MongoDB

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

async function getMovieById(id) {
  const connectiondb = await getConnection();
  const movie = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .findOne({ _id: new ObjectId(id) }); // Convierte id a ObjectId y busca la película

  return movie;
}

async function getAwardWinningMovies() {
  const connectiondb = await getConnection();
  // Filtro para obtener películas con al menos un premio ganado
  const filter = { "awards.wins": { $gt: 0 } };

  // Proyección para devolver solo el título, el póster y el resumen de la reseña (plot)
  const projection = { title: 1, poster: 1, plot: 1, "awards.wins": 1, _id: 1 };

  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find(filter)
    .project(projection)
    .toArray();

  return movies;
}

async function getMoviesByLanguage(language, pageSize = 10, page = 0) {
  const connectiondb = await getConnection();
  const filter = { languages: language };
  //const projection = { title: 1, poster: 1, plot: 1, _id: 0, languages: 1 };

  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find(filter)
    //.project(projection)
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();

  return movies;
}

async function getMoviesByFreshScore(pageSize = 10, page = 1) {
  const connectiondb = await getConnection();
  const projection = { title: 1, poster: 1, plot: 1, _id: 1, "tomatoes.fresh": 1 };

  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({})
    .sort({ "tomatoes.fresh": -1 }) // Ordena las películas por puntaje "fresh" de forma descendente
    .skip(pageSize * page)
    .limit(pageSize)
    .project(projection)
    .toArray();

  return movies;
}

export {
  getAwardWinningMovies,
  getAllMovies,
  getMovieById,
  getMoviesByLanguage,
  getMoviesByFreshScore,
};
