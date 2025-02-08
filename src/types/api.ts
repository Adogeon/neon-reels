import { MovieDetails, MovieSimple } from "./Movie"

export interface MovieSearchResponseSuccess {
    page: number,
    results: Array<MovieSimple>
    total_pages: number,
    total_results: number
}

export interface MovieSearchResponseError {
    success: boolean,
    status_code: number,
    status_message: string
}

export interface MovieDetailSuccess {
    data: MovieDetails
}