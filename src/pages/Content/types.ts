export interface History {
    id: string;
    title: string;
    tags: string[];
}

export interface Profile {
    photo: string;
    teams: {
        id: string;
        name: string;
        path: string;
        logo: string;
    }[];
}

export interface Template {
    id: string;
    title: string;
}

export interface SearchResult {
    id: string;
    title: string;
    tags: string[];
    team?: {
        name: string;
    };
}
