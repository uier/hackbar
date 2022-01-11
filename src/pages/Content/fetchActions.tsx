import React from "react";
import { Action } from "kbar";
import { myWorkspaceAction } from "./defaultActions";
import { PlusIcon, NoteIcon } from "./icon";

interface History {
    history: {
        id: string;
        title: string;
        tags: string[];
    }[];
}

interface Profile {
    photo: string;
    teams: {
        id: string;
        name: string;
        path: string;
        logo: string;
    }[];
}

interface Template {
    templates: {
        id: string;
        title: string;
    }[];
}

interface SearchResult {
    id: string;
    title: string;
    tags: string[];
    team?: {
        name: string;
    };
}

export const fetchRecentNotes = async () => {
    const response: History = await fetch("/api/_/history?limit=3").then((r) => r.json());
    const recentNotes: Action[] = response.history.map(({ id, title, tags }) => ({
        id,
        name: title,
        section: "Recent",
        subtitle: tags.map((t) => `#${t}`).join(" ") || "(no tags)",
        perform: () => {
            window.location.pathname = `/${id}`;
        },
        icon: <NoteIcon />,
    }));
    return recentNotes;
};

export const fetchTeams = async () => {
    const response: Profile = await fetch("/me").then((r) => r.json());
    const teamActions: Action[] = response.teams.map(({ id, name, path, logo }) => ({
        id,
        name,
        section: "Action",
        perform: () => {
            window.location.pathname = `/team/${path}`;
        },
        icon: <TeamAvatar src={logo} />,
        parent: "switch-team",
    }));
    const teamActionsWithMyWorkspaceprepended = [
        myWorkspaceAction(<TeamAvatar src={response.photo} />),
        ...teamActions,
    ];
    return teamActionsWithMyWorkspaceprepended;
};

export const fetchTemplaces = async () => {
    const response: Template = await fetch("/template").then((r) => r.json());
    const templateActions: Action[] = response.templates.map(({ id, title: name }) => ({
        id,
        name,
        section: "New Note From Template",
        perform: () => {
            createNote(id);
        },
        icon: <PlusIcon />,
        parent: "new-note",
    }));
    return templateActions;
};

const createNote = (templateId: string) => {
    fetch(`/template/${templateId}`, {
        method: "POST",
        headers: {
            "x-xsrf-token": (document.querySelector('meta[name="csrf-token"]') as Element).getAttribute(
                "content",
            ) as string,
        },
    })
        .then((r) => r.text())
        .then((url) => (window.location.href = url));
};

export const searchNotes = async (query: string) => {
    if (!query) return [];
    const response: SearchResult[] = await fetch(`/api/_/search?q=${query}`).then((r) => r.json());
    const noteActions: Action[] = response.map(({ id, title, tags, team }) => ({
        id,
        name: title,
        section: "Search Results",
        subtitle: `@${team?.name || "My Workspace"} ${(tags || []).map((t) => `#${t}`).join(" ") || "(no tags)"}`,
        perform: () => {
            window.location.pathname = `/${id}`;
        },
        icon: <NoteIcon />,
    }));
    return noteActions;
};

function TeamAvatar(props: { src: string }) {
    return <img width={24} height={24} style={{ borderRadius: 12 }} src={props.src}></img>;
}
