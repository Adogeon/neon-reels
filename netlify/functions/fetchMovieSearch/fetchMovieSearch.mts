import dotenv from 'dotenv';
import { Config, Context } from '@netlify/functions';
import fetch from "node-fetch";

dotenv.config();

export default async function (req: Request, context: Context) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=die%20hard`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.MOVIE_API_AUTH_TOKEN}`,
                Accept: `application/json`
            }
        })
        const data = await response.json();
        return Response.json({
            data
        })
    } catch (error) {
        return new Response(error.toString(), {
            status: 500,
        })
    }
}