import { Router } from "express";
import { getMoviesWithAtLeastOneAward } from "../data/awardsMovies.js";

const router = Router();

router.get("/", async (req, res) => {
    let { pageSize, page }  = req.query;
    pageSize = pageSize ? parseInt(pageSize) : 0;
    page = page ? parseInt(req.query.page) : 0;

    const awardsMovies = await getMoviesWithAtLeastOneAward(pageSize, page);
    return res.status(200).json(awardsMovies);
});

export default router;
