const shortcutLabel = document.querySelector("#shortcut");
const editShortcutLabel = document.querySelector("#edit-shortcut");
const editButton = document.querySelector("#edit");
const loadingText = document.querySelector("#loading");
const hintText = document.querySelector("#hint");
const defaultShortcut = navigator.userAgent.toUpperCase().includes("MAC") ? "Command+k" : "Control+k";
const setLoading = (isLoading) => {
    if (isLoading) {
        loadingText.style.display = "block";
    } else {
        loadingText.style.display = "none";
    }
};
const getShortcutName = (shortcut) => {
    return navigator.userAgent.toUpperCase().includes("MAC")
        ? shortcut.replace("Meta", "Command").replace("Alt", "Option")
        : shortcut;
};
const getShortcut = () => {
    chrome.storage.sync.get("shortcut", (data) => {
        shortcutLabel.innerText = getShortcutName(data.shortcut) || defaultShortcut;
        editShortcutLabel.innerText = getShortcutName(data.shortcut) || defaultShortcut;
        setLoading(false);
    });
};
const updateShortcut = (shortcut) => {
    setLoading(true);
    chrome.storage.sync.set({ shortcut: shortcut }, () => {
        getShortcut();
        hintText.innerText = "Changed successfully, refresh HackMD web page to activate";
    });
};
const logKeydown = (event) => {
    pressedKeys.push(event.key);
};

setLoading(true);
getShortcut();
let startRecording = false;
let pressedKeys = [];
window.addEventListener("keyup", () => {
    if (startRecording) {
        window.removeEventListener("keydown", logKeydown);
        startRecording = false;
        updateShortcut(pressedKeys.join("+"));
    }
});
editButton.addEventListener("click", () => {
    pressedKeys = [];
    startRecording = true;
    editShortcutLabel.innerText = "(type the new keys)";
    hintText.innerText = "";
    window.addEventListener("keydown", logKeydown);
});
