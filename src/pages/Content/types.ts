export interface History {
    id: string;
    shortId: string;
    userpath: string;
    teampath: string;
    title: string;
    tags: string[];
    isOwner?: boolean;
}

export interface Profile {
    photo: string;
    teams: {
        id: string;
        name: string;
        path: string;
        logo: string;
    }[];
    userpath: string;
}

export interface Template {
    id: string;
    title: string;
}

export interface SearchResult {
    id: string;
    shortId: string;
    title: string;
    tags: string[];
    owner?: {
        name: string;
        userpath: string;
    };
    team?: {
        name: string;
        path: string;
    };
    isOwner?: boolean;
}

export interface Note {
    id: string;
    shortId: string;
    teampath: string | undefined;
    userpath: string | undefined;
}
