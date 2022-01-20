import type { Action } from "kbar";
import React from "react";
import { PlusIcon, SwitchIcon, HomeIcon } from "./icon";

export const defaultActions: Action[] = [
    {
        id: "new-note",
        name: "New Note",
        shortcut: ["+"],
        keywords: "new +",
        section: "Action",
        icon: <PlusIcon />,
    },
    {
        id: "switch-team",
        name: "Switch Team",
        shortcut: ["@"],
        keywords: "switch team @",
        section: "Action",
        icon: <SwitchIcon />,
    },
    {
        id: "return-home",
        name: "Home Page",
        keywords: "home",
        section: "Action",
        icon: <HomeIcon />,
        perform: () => {
            window.location.pathname = "/";
        },
    },
];

export const emptyNoteAction: Action = {
    id: "empty-note",
    name: "New Empty Note",
    keywords: "new",
    section: "",
    icon: <PlusIcon />,
    perform: () => {
        window.location.pathname = "/new";
    },
    parent: "new-note",
};

export const myWorkspaceAction = (icon: React.ReactElement): Action => ({
    id: "my-workspace",
    name: "My Workspace",
    keywords: "my me i",
    section: "Action",
    icon,
    perform: () => {
        window.location.pathname = "/";
    },
    parent: "switch-team",
});
