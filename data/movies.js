import getConnection from "./conn.js";
const DATABASE = "sample_mflix";
const MOVIES = "movies";
const COMMENTS = "comments"
const USERS = "users"

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
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .findOne({_id:id})
  return movies;
}

async function getMoviesThatWonAwards(pageSize, page) {
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ 'awards.wins': { $gt: 0 } })
    .project({
      title: 1,
      poster:1,
      plot:1
    })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return movies;
}

async function getMoviesByLanguages(pageSize, page, languages) {
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ 'languages': { $all: languages } })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return movies;
}

async function getMoviesOrderByFresh(pageSize, page) {
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

async function getComments(movieId) {
  const connectiondb = await getConnection();
  const comments = await connectiondb
    .db(DATABASE)
    .collection(COMMENTS)
    .find({movie_id:movieId})
    .limit(1)
    .toArray();
  return comments;
}

async function getUsers(email) {
  const connectiondb = await getConnection();
  const users = await connectiondb
    .db(DATABASE)
    .collection(USERS)
    .find({email})
    .limit(1)
    .toArray();
  return users;
}

export { getAllMovies,getMovieById,getMoviesThatWonAwards,getMoviesByLanguages,getMoviesOrderByFresh,getComments,getUsers };
