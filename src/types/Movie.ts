export interface Movie {
    adult: boolean,
    backdrop_path: string,
    genre_ids: Array<number>,
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    vote_avarage: number,
    vote_acount: number
}

export interface MovieDetails {
    adult: false;
    backdrop_path: string,
    belongs_to_collections: Collection
    budget: number,
    genres: Array<Genre>,
    homepage: string,
    id: number,
    imdb_id: string,
    origin_countr: Array<string>
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    revenue: number,
    runtime: number,
    status: string,
    tagline: string,
    title: string,
    vote_average: number,
    vote_counte: number
}

interface Genre {
    id: number,
    name: string
}
interface Collection {
    id: number,
    name: string,
    poster_path: string,
    backdrop_path: string,
}