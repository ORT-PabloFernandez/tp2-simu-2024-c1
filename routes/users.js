import express from "express";
import { getUserById } from "../data/users.js";
import { getCommentsByEmail } from "../data/comments.js";
import { getMovieById } from "../data/movies.js";


const router = express.Router();



router.get("/:id", async (req, res) => {
    try {
      const user = await getUserById(req.params.id);
      if (user) {
        console.log("gola");
        //pido los comentarios
        const comments = await getCommentsByEmail(user.email);
        if(comments){
            let commentsWithMovies = []
            for (const comment of comments) {
                const movie = await getMovieById(comment.movie_id);
                if(movie){
                    commentsWithMovies.push({
                        comment: comment.text,
                        movie: {
                            title: movie.title,
                            poster: movie.poster
                        }
                    });
                }
            }
            res.json(commentsWithMovies);
        } else{
            res.status(404).json({ message: "El usuario no posee comentarios" });
        }
      } else {
        res.status(404).json({ message: "Usuario no encontrada" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });



export default router;