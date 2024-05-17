import express from "express";
import { getUserCommentsMovie } from "../data/comments.js";

const router = express.Router();

router.get("/user/:userId/comments", async (req, res) => {
  const userId = req.params.userId;

  try {
    const userCommentsMovie = await getUserCommentsMovie(userId);
    res.json(userCommentsMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
