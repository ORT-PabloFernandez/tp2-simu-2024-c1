import { ObjectId } from "mongodb";
import getConnectionMongo from "../helper/connection.js";

const DATABASE = "sample_mflix";
const COMMENTS = "comments";
const MOVIES = "movies";

const getUserCommentWithMovie = async (userId, pageSize, page) => {
    try {
        const client = await getConnectionMongo(DATABASE, COMMENTS);
        const comments = await client
            .aggregate([
                { $match: { user_id: new ObjectId(userId) }},
                {
                    $lookup: {
                        from: MOVIES,
                        localField: "movie_id",
                        foreignField: "_id",
                        as: "movieDetails"
                    }
                },
                { $unwind: "$movieDetails"},
                {
                    $project: {
                        comment: 1,
                        "movieDetails.title": 1,
                        "movieDetails.poster": 1
                    }
                }
            ])
            .limit(pageSize)
            .skip(pageSize * page)
            .toArray();

        return comments;
    } catch (error) {
        console.error(error);
    }
};

export {
    getUserCommentWithMovie,
};
