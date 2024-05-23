// import { ObjectId } from "mongodb";
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

// export async function getMovie(id) {
//   const connectiondb = await getConnection();
//   const movie = await connectiondb
//     .db(DATABASE)
//     .collection(MOVIES)
//     .findOne({ _id: new ObjectId(id) });

//   return movie;
// }

export async function getAwardedMovies() {
  //agregar paginado
  const movies = await getAllMovies(0, 0);
  const awardedM = movies
    .filter((movie) => movie.awards.wins > 0)
    .map((m) => ({
      title: m.title,
      poster: m.poster,
      plot: m.plot,
    }));
  return awardedM;
}

export async function getMoviesByLanguage(languages, pageSize, page) {
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({
      languages: languages,
    })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return movies;
}
