const { spawnSync } = require("child_process");
const { copyFileSync, writeFileSync, existsSync, rmSync, createWriteStream } = require("fs");
const { resolve } = require("path");
const archiver = require("archiver");

// #region Configs
const root = resolve(__dirname, "..");
const dest = resolve(root, "build");
const src = resolve(root, "src");

const entry = resolve(src, "pages/Content/index.tsx");
const manifest = require(resolve(src, "manifest.json"));
const package = require(resolve(root, "package.json"));

const files = {
    [resolve(src, "pages/Popup/index.html")]: resolve(dest, "popup.html"),
    [resolve(src, "pages/Options/index.html")]: resolve(dest, "options.html"),
    [resolve(src, "assets/img/icon-34.png")]: resolve(dest, "icon-34.png"),
    [resolve(src, "assets/img/icon-128.png")]: resolve(dest, "icon-128.png"),
};
// #endregion

// #region Build
if (existsSync(dest)) {
    rmSync(dest, { recursive: true });
}

spawnSync(`npx esbuild ${entry} --bundle --minify --outfile=build/contentScript.js --target=esnext`, {
    shell: true,
    stdio: "inherit",
});

Object.entries(files).forEach(([src, dest]) => {
    copyFileSync(src, dest);
});

Object.assign(manifest, { version: package.version, description: package.description });
writeFileSync(resolve(dest, "manifest.json"), JSON.stringify(manifest));
// #endregion

// #region Zip
const archive = archiver("zip").glob("**/*", { cwd: dest, ignore: ["**/*.zip"] });
archive.pipe(createWriteStream(resolve(dest, `hackbar_${package.version}.zip`)));
archive.finalize();
// #endregion
