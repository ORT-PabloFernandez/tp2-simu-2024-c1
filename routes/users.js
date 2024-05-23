import express from "express";
import { getUserById } from "../data/users.js";
import { getCommentsByEmail } from "../data/comments.js";
import { getMovieById } from "../data/movies.js";

const router = express.Router();

router.get("/:id", async (req, res) => {});

export default router;
