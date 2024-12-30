import { Movie } from "./Movie"

export interface MovieSearchResponseSuccess {
    page: number,
    results: Array<Movie>
    total_pages: 6,
    total_results: 111
}

export interface MovieSearchResponseError {
    success: boolean,
    status_code: number,
    status_message: string
}