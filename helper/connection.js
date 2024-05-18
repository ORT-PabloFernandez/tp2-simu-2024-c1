import getConnection from "../data/conn.js";

const getConnectionMongo = async (database, movies) => {
    try {
        const connectiondb = await getConnection();
        if (!connectiondb) {
            throw new Error("Connection failed");
        }

        const client = await connectiondb
            .db(database)
            .collection(movies)

        return client;
    } catch (error) {
        console.error(error);
    }
}

export default getConnectionMongo;
