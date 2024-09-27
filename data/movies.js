import getConnection from "./conn.js";
import { ObjectId } from 'mongodb';
const DATABASE = "sample_mflix";
const MOVIES = "movies";

export async function getAllMovies(pageSize, page) {
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

export async function getMovieById(id) {
  const connectiondb = await getConnection();
  const movie = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .findOne({ _id: new ObjectId(id) });
  return movie;
}

export async function getPeliculasGanadoras() {
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ awards: { $exists: true, $ne: [] } })
    .project({ title: 1, poster: 1, plot: 1 })
    .toArray();
  return movies;
}

export async function getMoviesByLanguage(language, pageSize, page) {
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ languages: { $in: [language] } })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return movies;
}


// Este se creo por un error que arrojaba el de ID. A modo de Test
export async function getMovieByTitle(title) {
  const connectiondb = await getConnection();
  const movie = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .findOne({ title: title }, { projection: { _id: 1, title: 1, plot: 1 } });
  return movie;
}

