export interface PeopleSimple {
    name: string;
    department: string;
}

export interface Credits {
    cast: Array<CastMember>;
    crew: Array<CrewMember>;
}

export interface People {
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
}

export interface CastMember extends People {
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

export interface CrewMember {
    credit_id: string,
    department: string,
    job: string;
}