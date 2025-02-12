import { MovieSearchResponseError, MovieSearchResponseSuccess } from "../types/api";
import { MovieDetails } from "../types/Movie";

const BASE_API_URL = 'https://api.themoviedb.org/3/'
const SEARCH_MOVIE_URL = BASE_API_URL + 'search/movie'
const GET_MOVIE_DETAIL_URL = BASE_API_URL + 'movie/'
const apiKey = import.meta.env.VITE_MOVIE_API_AUTH_TOKEN

type APIResponse<T> = Promise<T | MovieSearchResponseError | undefined>
async function fetchAPIData<T>(url: string): APIResponse<T> {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
        }
    }

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (result.status_code !== undefined) {
            return result as T
        } else {
            return result as MovieSearchResponseError
        }
    } catch (error) {
        if (error instanceof Error) {
            const networkError = {
                error: 'FetchError',
                message: `Network error: ${error.message}`
            };
            throw networkError;
        } else {
            throw error;
        }
    }
}

export const searchMovie = async (query: string) => {
    console.log(query);
    const url = SEARCH_MOVIE_URL + `?query=${encodeURIComponent(query)}&include_adult=false&language=en-US`
    return fetchAPIData<MovieSearchResponseSuccess>(url);
}

export const getMovieDetails = async (id: string) => {
    const url = GET_MOVIE_DETAIL_URL + `${id}`
    return fetchAPIData<MovieDetails>(url);
}