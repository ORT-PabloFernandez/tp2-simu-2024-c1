import getConnection from "./conn.js";
import { ObjectId } from "mongodb";

const DATABASE = "sample_mflix";
const COMMENTS = "comments";
const MOVIES = "movies";

async function getUserComments(userId) {
  const connectiondb = await getConnection();
  const userComments = await connectiondb
    .db(DATABASE)
    .collection(COMMENTS)
    .find({ _id: new ObjectId(userId) })
    .toArray();
  return userComments;
}

async function getMovieComments(movieId) {
  const connectiondb = await getConnection();
  const movieDetails = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .findOne({ _id: new ObjectId(movieId) });
  return movieDetails;
}

async function getUserCommentsMovie(userId) {
  const userComments = await getUserComments(userId);
  const userCommentsMovie = [];

  for (const comment of userComments) {
    const movieDetails = await getMovieComments(comment.movie_id);
    if (movieDetails) {
      userCommentsMovie.push({
        comment: comment,
        movieTitle: movieDetails.title,
        moviePoster: movieDetails.poster,
      });
    }
  }
  return userCommentsMovie;
}

export { getUserCommentsMovie };