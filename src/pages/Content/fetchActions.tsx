import type { Action } from "kbar";
import type { History, Profile, Template, SearchResult } from "./types";
import React from "react";
import { myWorkspaceAction } from "./defaultActions";
import { PlusIcon, NoteIcon } from "./icon";

export const fetchRecentNotes = async () => {
    const histories: History[] = await fetch("/api/_/history?limit=3")
        .then((res) => res.json())
        .then((data) => data.history);
    const recentNotes: Action[] = histories.map(({ id, title, tags }) => ({
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
    const profile: Profile = await fetch("/me").then((res) => res.json());
    const teamActions: Action[] = profile.teams.map(({ id, name, path, logo }) => ({
        id,
        name,
        section: "Action",
        perform: () => {
            window.location.pathname = `/team/${path}`;
        },
        icon: <TeamAvatar src={logo} />,
        parent: "switch-team",
    }));
    const teamActionsWithMyWorkspaceprepended = [myWorkspaceAction(<TeamAvatar src={profile.photo} />), ...teamActions];
    return teamActionsWithMyWorkspaceprepended;
};

export const fetchTemplaces = async () => {
    const templates: Template[] = await fetch("/template")
        .then((res) => res.json())
        .then((data) => data.templates);
    const templateActions: Action[] = templates.map(({ id, title: name }) => ({
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
        .then((res) => res.text())
        .then((url) => (window.location.href = url));
};

export const searchNotes = async (query: string) => {
    if (!query) return [];
    const results: SearchResult[] = await fetch(`/api/_/search?q=${query}`).then((res) => res.json());
    const noteActions: Action[] = results.map(({ id, title, tags, team }) => ({
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
