import { type MovieSearchResponseSuccess } from "../types/api";


export default async (subject: string) => {
    const response = await fetch(`./api/fetchMovieSearch?search=${encodeURIComponent(subject)}`);
    const result = await response.json();
    console.log(result)
    return result.data as MovieSearchResponseSuccess;
}