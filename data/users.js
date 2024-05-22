import getConnection from "./conn.js";
import { ObjectId } from "mongodb";

const DATABASE = "sample_mflix";
const USERS = "users";

/* export async function getAllUsers() {
    const connectiondb = await getConnection();
    const users = await connectiondb
      .db(DATABASE)
      .collection(USERS)
      .findOne({ })
      .toArray();
    return users;
  } */



export async function getUserById(id) {
    const connectiondb = await getConnection();
    let user;
    try {
        user = await connectiondb
        .db(DATABASE)
        .collection(USERS)
        .findOne({ _id: new ObjectId(id) })
    } catch (error) {
      throw new Error('Invalid ID format');
    }
    return user;
  }