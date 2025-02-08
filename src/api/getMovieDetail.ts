import { type MovieDetails } from "../types/Movie"

export interface movieDetailSuccess {
    data: MovieDetails
}

export default async (id: string) => {

    const response = await fetch(`./api/fetchMovieDetails/${id}`)
    const result = await response.json();
    return result as MovieDetails;
}