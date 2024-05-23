import getConnection from "./conn.js";
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



export async function getWinMovie(pageSize, page) {
  const connectiondb = await getConnection();
  const movie = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ 'awards.wins': { $gt: 0 } })
    .project({ plot: 1, poster: 1, title: 1 })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();

  return movie;
}

export async function getMoviesLanguage(pageSize, page, language) {
  const connectiondb = await getConnection();
  const movie = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ "languages": { $regex: new RegExp(language, "i") } })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
    
  return movie;
}

export async function getMoviesRanking(pageSize, page) {
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

