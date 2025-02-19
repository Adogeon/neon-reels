import { MovieDetails, MovieSimple } from "./Movie"
import { Credits } from "./People"

export interface MovieListResponse {
    page: number,
    results: Array<MovieSimple>
    total_pages: number,
    total_results: number
}
export interface APIResponseError {
    success: boolean,
    status_code: number,
    status_message: string
}

export interface MovieDetailsResponse extends MovieDetails {
    recommendations: MovieListResponse;
    credits: Credits
}
