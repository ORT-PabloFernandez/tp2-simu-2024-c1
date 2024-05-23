import getConnection from "./conn.js";
import { ObjectId } from "mongodb";

const DATABASE = "sample_mflix";
const COMMENTS = "comments"

async function getAllComments() {
    try {
        const connectiondb = await getConnection();
        const comments = await connectiondb.db(DATABASE).collection(COMMENTS).find({}).toArray();
        return comments;
    } catch (e) {
        console.log(e.message);
    }
}

export { getAllComments }