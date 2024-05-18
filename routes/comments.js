import { Router } from "express";
import { getUserCommentWithMovie } from "../data/comments.js";

const router = Router();

router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        let { pageSize, page } = req.query;
        pageSize = pageSize ? parseInt(pageSize) : 10;
        page = page ? parseInt(req.query.page) : 0;

        const comments = await getUserCommentWithMovie(userId, pageSize, page);
        if (!comments || comments.length == 0) {
            return res.status(404).json({ message: "No users were found" });
        }

        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router;
