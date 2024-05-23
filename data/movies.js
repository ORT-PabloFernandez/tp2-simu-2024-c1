import { ObjectId } from "mongodb";
import getConnection from "./conn.js";

const DATABASE = "sample_mflix";
const MOVIES = "movies";

export async function getAllMovies(pageSize, page) {
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({})
    .project({ _id: 0, plot: 1, title: 1, poster: 1 }) // Proyección para devolver solo title y post
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return movies;
}

export async function getMoviesOrderFresh(pageSize, page) {
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({})
    .sort({ "tomatoes.fresh": -1 })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return movies;
}
export async function getMovie(id) {
  const clientmongo = await getConnection();
  const movie = await clientmongo
    .db(DATABASE)
    .collection(MOVIES)
    .findOne({ _id: new ObjectId(id) });
  return movie;
}
export async function getMoviesByLanguage(language, pageSize, page) {
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
