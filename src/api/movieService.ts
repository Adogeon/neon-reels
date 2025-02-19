import { APIResponseError, MovieListResponse, MovieDetailsResponse } from "../types/api";

const BASE_API_URL = 'https://api.themoviedb.org/3/'
const SEARCH_MOVIE_URL = BASE_API_URL + 'search/movie'
const GET_MOVIE_DETAIL_URL = BASE_API_URL + 'movie/'
const GET_UPCOMING_MOVIE_LIST_URL = GET_MOVIE_DETAIL_URL + `upcoming`
const GET_NOW_PLAYING_MOVIE_LIST_URL = GET_MOVIE_DETAIL_URL + `now_playing`
const GET_POPULAR_MOVIE_LIST_URL = GET_MOVIE_DETAIL_URL + `popular`
const apiKey = import.meta.env.VITE_MOVIE_API_AUTH_TOKEN

type APIResponse<T> = Promise<T | undefined>
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

        if ("status_code" in result) {
            throw result as APIResponseError
        } else {
            return result as T
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
    const url = SEARCH_MOVIE_URL + `?query=${encodeURIComponent(query)}&include_adult=false&language=en-US`;
    return fetchAPIData<MovieListResponse>(url);
}

export const getMovieDetails = async (id: string) => {
    const url = GET_MOVIE_DETAIL_URL + `${id}?append_to_response=recommendations,credits`;
    return fetchAPIData<MovieDetailsResponse>(url);
}

export const getUpcomingMovie = async () => {
    const url = GET_UPCOMING_MOVIE_LIST_URL;
    return fetchAPIData<MovieListResponse>(url);
}

export const getNowPlaying = async () => {
    const url = GET_NOW_PLAYING_MOVIE_LIST_URL;
    return fetchAPIData<MovieListResponse>(url);
}

export const getPopular = async () => {
    const url = GET_POPULAR_MOVIE_LIST_URL;
    return fetchAPIData<MovieListResponse>(url);
}