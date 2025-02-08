export interface MovieBase {
    adult: boolean,
    backdrop_path: string,
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    vote_average: number,
    vote_count: number,
}

export interface MovieSimple extends MovieBase {
    genre_ids: Array<number>
}

export interface MovieDetails extends MovieBase {
    belongs_to_collection: MovieCollection,
    budget: number,
    genres: Array<Genre>,
    homepage: string,
    imdb_id: string,
    origin_country: Array<string>
    revenue: number,
    runtime: number,
    status: string,
    tagline: string,
}

interface Genre {
    id: number,
    name: string
}
interface MovieCollection {
    id: number,
    name: string,
    poster_path: string,
    backdrop_path: string,
}