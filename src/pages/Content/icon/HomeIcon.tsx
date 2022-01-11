import React from "react";

const icon = (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {" "}
        <path stroke="none" d="M0 0h24v24H0z" /> <polyline points="5 12 3 12 12 3 21 12 19 12" />{" "}
        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /> <rect x="10" y="12" width="4" height="4" />
    </svg>
);

export function HomeIcon() {
    return icon;
}
