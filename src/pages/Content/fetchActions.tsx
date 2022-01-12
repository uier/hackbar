import type { Action } from "kbar";
import type { History, Profile, Template, SearchResult } from "./types";
import React from "react";
import { myWorkspaceAction } from "./defaultActions";
import { PlusIcon, NoteIcon } from "./icon";
import { retry } from "./utils";

export async function fetchRecentNotes() {
    const histories: History[] = await retry(() =>
        fetch("/api/_/history?limit=3")
            .then((res) => (res.ok ? res.json() : Promise.reject(res)))
            .then((data) => data.history),
    );
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
}

export async function fetchTeams() {
    const profile: Profile = await retry(() => fetch("/me").then((res) => (res.ok ? res.json() : Promise.reject(res))));
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
}

export async function fetchTemplaces() {
    const templates: Template[] = await retry(() =>
        fetch("/template")
            .then((res) => (res.ok ? res.json() : Promise.reject(res)))
            .then((data) => data.templates),
    );
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
}

export async function searchNotes(query: string) {
    if (!query) return [];
    const results: SearchResult[] = await retry(() =>
        fetch(`/api/_/search?q=${query}`).then((res) => (res.ok ? res.json() : Promise.reject(res))),
    );
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
}

async function createNote(templateId: string) {
    const csrfToken = document.querySelector("meta[name=csrf-token]")?.getAttribute("content") as string;
    return retry(() =>
        fetch(`/template/${templateId}`, { method: "POST", headers: { "x-xsrf-token": csrfToken } })
            .then((res) => (res.ok ? res.text() : Promise.reject(res)))
            .then((url) => (window.location.href = url)),
    );
}

function TeamAvatar(props: { src: string }) {
    return <img width={24} height={24} style={{ borderRadius: 12 }} src={props.src}></img>;
}
