const { ObjectId } = require('mongodb');
import getConnection from "./conn.js";

const DATABASE = "sample_mflix";
const COMMENTS = "comments";

export async function getUserCommentsWithMovies(userId) {
  const connectiondb = await getConnection();

  try {
    const comments = await connectiondb
      .db(DATABASE)
      .collection(COMMENTS)
      .aggregate([
        {
          $match: { userId: new ObjectId(userId) } // Filtrar comentarios por userId
        },
        {
          $lookup: {
            from: MOVIES, // Unir con la colección de películas
            localField: 'movieId', // Campo en comments que referencia a la película
            foreignField: '_id', // Campo en movies que es el _id
            as: 'movieDetails' // Nombre del array que contendrá los detalles de la película
          }
        },
        {
          $unwind: '$movieDetails' // Descomprimir el array de movieDetails para acceder a los campos directamente
        },
        {
          $project: {
            _id: 0, // Excluir el _id
            text: 1, // Mantener el comentario
            movieTitle: '$movieDetails.title', // Incluir el título de la película
            moviePoster: '$movieDetails.poster' // Incluir el póster de la película
          }
        }
      ])
      .toArray();

    return comments;
  } catch (error) {
    console.log('Error obteniendo comentarios con películas:', error);
    throw error;
  }
}
