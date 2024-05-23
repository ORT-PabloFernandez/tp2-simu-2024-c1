import express from 'express';
import { getAllComments } from '../data/comments.js'

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.send(await getAllComments())
    } catch (e) {
        console.log(e.message);
    }
});

export default router;