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

async function getMovieById(id) {
  const connectiondb = await getConnection();
  const movie = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .findOne({ _id: new ObjectId(id) });

  if (!movie) {
    throw new Error("Movie not found");
  }

  console.log(movie);

  return movie;
}

async function getMovieByAwards(qty) {
  qty = parseInt(qty);
  const connectionDb = await getConnection();

  if (qty < 1) {
    throw new Error("Quantity must be greater than 0");
  }

  const movie = connectionDb.
    db(DATABASE).
    collection(MOVIES).
    find({ "awards.wins": { $gte: qty } }).
    project({ plot: 1, poster: 1, title: 1, awards: 1 }).
    toArray();

  return movie;
}

async function getMovieByLanguage(language) {
  const connectionDb = await getConnection();

  if (!language) {
    throw new Error("Language must be provided");
  }

  const movie = connectionDb.
    db(DATABASE).
    collection(MOVIES).
    find({ "languages": { $regex: new RegExp(language, "i") } }).
    toArray()

  return movie;
}

async function getMovieByFreshRanking() {
  try {
    const movies = await getAllMovies();

    const sortedMovies = movies.sort((a, b) => b.tomatoes.fresh - a.tomatoes.fresh);

    if (!sortedMovies) {
      throw new Error("Movies not found");
    }

    return sortedMovies;
  } catch (error) {
    console.error("Error fetching movies by fresh ranking:", error);
    throw error;
  }
}

export { getAllMovies, getMovieById, getMovieByAwards, getMovieByLanguage, getMovieByFreshRanking };
