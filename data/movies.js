import getConnection from "./conn.js";
import { ObjectId } from "mongodb";

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
  let movie;
  try {
    movie = await connectiondb
      .db(DATABASE)
      .collection(MOVIES)
      .findOne({ _id: new ObjectId(id) })
  } catch (error) {
    throw new Error('Invalid ID format');
  }
  return movie;
}

export async function getAwardWinnerMovies(){
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ "awards.wins": { $gt : 0} }, {title: 1, poster: 1, plot: 1})
    .toArray();
  return movies;
}