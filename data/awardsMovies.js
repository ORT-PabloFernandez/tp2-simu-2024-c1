import getConnection from "./conn.js";

const DATABASE = "sample_mflix";
const MOVIES = "movies";

const getMoviesWithAtLeastOneAward = async (pageSize, page) => {
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

export {
    getMoviesWithAtLeastOneAward,
};
