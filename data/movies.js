import { ObjectId } from "mongodb";
import getConnection from "./conn.js";
import { getUserById } from "./users.js";
import { getAllComments } from "./comments.js";

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

function isValidObjectId(id) {
  return ObjectId.isValid(id) && (String)(new ObjectId(id)) === id;
}

async function getMovieById(id) {
  try {
    if (!isValidObjectId(id)) {
      throw new Error("Invalid ID format");
    }

    const connectiondb = await getConnection();
    const movie = await connectiondb
      .db(DATABASE)
      .collection(MOVIES)
      .findOne({ _id: new ObjectId(id) });

    if (!movie) {
      throw new Error("Movie not found");
    }

    return movie;
  } catch (e) {
    console.error(e)
    throw e;
  }
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

async function getMoviesByFreshRanking(pageSize, page) {
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ 'tomatoes.fresh': { $exists: true } })
    .sort({ 'tomatoes.fresh': -1 })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return movies;
}

async function getUserComments(id) {
  const user = await getUserById(id);
  const comments = await getAllComments();

  return comments.filter((comment) => comment.name === user.name);
}

export { getAllMovies, getMovieById, getMovieByAwards, getMovieByLanguage, getMoviesByFreshRanking, getUserComments };
