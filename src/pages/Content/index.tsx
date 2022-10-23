import React from "react";
import { render } from "react-dom";
import App from "./App";

const root = document.createElement("div");
root.id = "hackbar-app-root";

chrome.storage.sync.get(["shortcutHead", "shortcutTail"], (data) => {
    const shortcut = data.shortcutHead && data.shortcutTail ? [data.shortcutHead, data.shortcutTail].join("+") : "";
    render(<App shortcut={shortcut} />, root);
});
