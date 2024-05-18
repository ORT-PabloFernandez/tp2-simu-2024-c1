import { ObjectId } from "mongodb";
import getConnection from "./conn.js";
import getConnectionMongo from "../helper/connection.js";

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

const getMovieById = async (id) => {
    try {
        const client = await getConnectionMongo(DATABASE, MOVIES);
        const movie = client.findOne({ _id: new ObjectId(id) });

        return movie;
    } catch (error) {
        console.error(error);
    }
};

const getMoviesSortedByFresh = async (pageSize, page) => {
    try {
        const client = await getConnectionMongo(DATABASE, MOVIES);
        const movies = await client
            .find({})
            .sort({ "tomatoes.fresh": -1 })
            .limit(pageSize)
            .skip(pageSize * page)
            .toArray();

        return movies;
    } catch (error) {
        console.error(error);
    }
};

const filteredMovies = async (language, pageSize, page) => {
    try {
        const client = await getConnectionMongo(DATABASE, MOVIES);
        const movies = await client
            .find({ languages: language })
            .limit(pageSize)
            .skip(pageSize * page)
            .toArray();

        return movies;
    } catch (error) {
        console.error(error);
    }
};

const getMoviesWithAtLeastOneAward = async (pageSize, page) => {
    try {
        const client = await getConnectionMongo(DATABASE, MOVIES);
        const movies = await client
            .find({ "awards.wins": { $gt: 0 } })
            .project({ title: 1, poster: 1, plot: 1 })
            .limit(pageSize)
            .skip(pageSize * page)
            .toArray();

        return movies;
    } catch (error) {
        console.error(error);
    }
};

export {
    getAllMovies,
    getMovieById,
    getMoviesSortedByFresh,
    filteredMovies,
    getMoviesWithAtLeastOneAward,
};
