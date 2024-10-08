import express from "express";
import { getUserCommentsWithMovies } from "../data/comments.js";

const router = express.Router();

router.get("/comments/:id", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getUserCommentsWithMovies(pageSize, page));
});

export default router;