import getConnection from "./conn.js";

const DATABASE = "sample_mflix";
const COMMENTS = "comments";

export async function getCommentsByEmail(email) {
  const connectiondb = await getConnection();
  const comments = await connectiondb
    .db(DATABASE)
    .collection(COMMENTS)
    .find({ email: email })
    .toArray();
  return comments;
}
