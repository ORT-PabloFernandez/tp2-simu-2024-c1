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

const getMovieById = async (id) => {
    try {
        const connectiondb = await getConnection();
        if (!connectiondb) {
            throw new Error("Connection failed");
        }

        const movie = await connectiondb
            .db(DATABASE)
            .collection(MOVIES)
            .findOne({ _id: new ObjectId(id)});

        return movie;
    } catch (error) {
        console.error(error);
    }
};

export {
    getAllMovies,
    getMovieById,
};
