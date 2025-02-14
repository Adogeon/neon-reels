import { MovieDetails, MovieSimple } from "./Movie"
import { Credits, PeopleSimple } from "./People"
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

export interface GetMovieDetailsResponseSuccess extends MovieDetails {
    recommendations: MovieSearchResponseSuccess;
    credits: Credits
}

export interface MovieDetailSuccess {
    data: MovieDetails
}