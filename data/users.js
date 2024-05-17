import getConnection from "./conn.js";
import { ObjectId } from "mongodb";

const DATABASE = "sample_mflix";
const USERS = "users";


async function getUser(userId) {
  const connectiondb = await getConnection();
  const user = await connectiondb
    .db(DATABASE)
    .collection(USERS)
    .findOne({ _id: new ObjectId(userId) });
  return user;
}

export { getUser };

