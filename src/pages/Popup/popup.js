const shortcutLabel = document.querySelector("#shortcut");
const editShortcutLabel = document.querySelector("#edit-shortcut");
const editButton = document.querySelector("#edit");
const loadingText = document.querySelector("#loading");
const hintText = document.querySelector("#hint");
const defaultShortcut = navigator.userAgent.toUpperCase().includes("MAC") ? "Command+k" : "Control+k";
let startRecording = false;
let pressedKeys = [];
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
        const sc = data && data.shortcut ? getShortcutName(data.shortcut) : defaultShortcut;
        shortcutLabel.innerText = sc;
        editShortcutLabel.innerText = sc;
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
window.addEventListener("keyup", () => {
    if (startRecording) {
        window.removeEventListener("keydown", logKeydown);
        startRecording = false;
        updateShortcut(pressedKeys.join("+"));
    }
});
editButton.addEventListener("click", () => {
    hintText.innerText = "";
    pressedKeys = [];
    startRecording = true;
    window.addEventListener("keydown", logKeydown);
    editShortcutLabel.innerText = "(type the new keys)";
});
