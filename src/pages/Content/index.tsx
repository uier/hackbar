import React from "react";
import { render } from "react-dom";
import App from "./App";

const root = document.createElement("div");
root.id = "hackbar-app-root";

chrome.storage.sync.get("shortcut", (data) => {
    render(<App shortcut={data.shortcut} />, root);
});
