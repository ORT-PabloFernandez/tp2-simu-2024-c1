import express from 'express';
import { getUsers, getUserById } from '../data/users.js'

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.send(await getUsers())
    } catch (e) {
        console.log(e.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        res.send(await getUserById(id));
    } catch (err) {
        console.log(err.message);
    }
})

export default router;