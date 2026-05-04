/**
 * One-shot: download assets referenced in manifest/*.json from Snokido mirror.
 * Run: node tools/fetch-from-manifests.mjs
 */
import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const BASE =
  "https://w8.snokido.com/games/html5/friday-night-funkin/zardy21/";

const manifests = ["songs.json", "shared.json", "tutorial.json", "week1.json"];

/** Default library paths are embedded inside Funkin.js as URL-encoded assets/… strings */
function collectPathsFromFunkin() {
  const fp = path.join(root, "Funkin.js");
  if (!fs.existsSync(fp)) return new Set();
  const raw = fs.readFileSync(fp, "utf8");
  return collectPaths(raw);
}

function collectPaths(content) {
  const out = new Set();
  /** Lime manifest encodes paths as assets%2F...file.ext then immediately y4: or R2… — not raw slashes only */
  const re =
    /(assets(?:%2F[a-zA-Z0-9._\-]+)+\.(?:png|jpg|jpeg|xml|txt|mp3|ogg|sm|json|lua|offset))/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    let p = m[1];
    try {
      p = decodeURIComponent(p);
    } catch {
      continue;
    }
    if (p.startsWith("assets/")) out.add(p);
  }
  return out;
}

function get(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          fs.unlink(dest, () => {});
          return get(res.headers.location, dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(dest, () => {});
          return reject(new Error(`${url} -> ${res.statusCode}`));
        }
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve()));
      })
      .on("error", (err) => {
        file.close();
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
}

async function main() {
  const all = new Set();
  for (const m of manifests) {
    const fp = path.join(root, "manifest", m);
    if (!fs.existsSync(fp)) {
      console.warn("skip missing", fp);
      continue;
    }
    const raw = fs.readFileSync(fp, "utf8");
    for (const p of collectPaths(raw)) all.add(p);
  }
  for (const p of collectPathsFromFunkin()) all.add(p);
  const list = [...all].sort();
  console.log("paths to fetch:", list.length);
  let ok = 0,
    fail = 0;
  for (const rel of list) {
    const dest = path.join(root, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const url = BASE + rel.split(path.sep).join("/");
    try {
      await get(url, dest);
      ok++;
      if (ok % 25 === 0) console.log("downloaded", ok);
    } catch (e) {
      fail++;
      console.warn("FAIL", rel, e.message);
    }
  }
  console.log("done ok", ok, "fail", fail);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
