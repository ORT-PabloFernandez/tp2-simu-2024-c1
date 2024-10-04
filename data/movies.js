import { Route } from "express";
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

export async function getMovie(id) {
  const connectiondb = await getConnection();
  const movie = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .findOne({ _id: new ObjectId(id) });
  return movie;
}

export async function getAwardWinningMovies() {
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ "awards.wins": { $gt: 0 } })
    .project({ title: 1, poster: 1, plot: 1 })
    .toArray();
  return movies;
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

export async function getAllMoviesByFreshRating() {
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ "tomatoes.fresh": { $exists: true } })
    .sort({ "tomatoes.fresh": -1 })
    .toArray();
  return movies;
}