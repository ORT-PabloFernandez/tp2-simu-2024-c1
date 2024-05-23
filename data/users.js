import getConnection from "./conn.js";
import { ObjectId } from "mongodb";

const DATABASE = "sample_mflix";
const USERS = "users"

async function getUsers() {
    try {
        const connectiondb = await getConnection();
        const users = await connectiondb.db(DATABASE).collection(USERS).find({}).toArray();
        return users;
    } catch (err) {
        console.log(err.message);
    }
}

async function getUserById(id) {
    try {
        const connectiondb = await getConnection();
        const user = await connectiondb.db(DATABASE).collection(USERS).findOne({ _id: new ObjectId(id) });
        return user;
    } catch (err) {
        console.log(err.message);
    }
}

export { getUsers, getUserById };