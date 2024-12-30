import dotenv from 'dotenv';
import { Context } from '@netlify/functions'
import fetch from 'node-fetch'

dotenv.config();

export default async (request: Request, context: Context) => {
    try {
        const movieId = context.params.id;

        const url = `https://api.themoviedb.org/3/movie/928?language=en-US`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.MOVIE_API_AUTH_TOKEN}`
            }
        }

        const fetchResponse = await fetch(url, options)
        const data = await fetchResponse.json();
        return Response.json({ data })
    } catch (error) {
        return new Response(error.toString(), {
            status: 500,
        })
    }
}
