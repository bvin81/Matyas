// Képek előkészítése a weboldalhoz: kicsinyítés + WebP-be alakítás.
//
// Használat (a projekt mappájából):
//   npm run images                       -> images-src/ mappa képei -> public/images/*.webp
//   npm run images -- --max 1600         -> nagyobb méret (pl. hero/borítókép)
//   npm run images -- --in fotok --out public/images/referinte --quality 80
//
// Mit csinál minden képpel:
//   1. elforgatja a telefon EXIF-adata szerint (ne legyen oldalra dőlve),
//   2. lekicsinyíti, hogy a hosszabbik oldala legfeljebb --max pixel legyen (nagyítani nem nagyít),
//   3. WebP-be menti, és ELDOBJA a metaadatokat (EXIF, GPS-hely!), mert egy ügyfél
//      házáról készült telefonos fotó GPS-koordinátát is tartalmazhat,
//   4. a fájlnevet webbaráttá alakítja: "Ablak Csere 2.JPG" -> "ablak-csere-2.webp".
// Ha a kimeneti fájl újabb, mint a forrás, kihagyja (gyorsan újrafuttatható).

import { readdir, stat, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// --- Beállítások (parancssorból felülírhatók) ---
const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
};
const IN_DIR = opt("in", "images-src");
const OUT_DIR = opt("out", "public/images");
const MAX = Number(opt("max", 1200));
const QUALITY = Number(opt("quality", 78));
const FORCE = args.includes("--force");

const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".avif"]);

// "Ușă Intrare (2).JPG" -> "usa-intrare-2"
function slugify(name) {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // ékezetek le: ő->o, ș->s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function main() {
  let files;
  try {
    files = await readdir(IN_DIR);
  } catch {
    console.error(`Nincs ilyen mappa: "${IN_DIR}". Hozd létre, és tedd bele az eredeti képeket.`);
    process.exit(1);
  }
  await mkdir(OUT_DIR, { recursive: true });

  let done = 0, skipped = 0, failed = 0, before = 0, after = 0;
  const seen = new Map(); // ütköző kimeneti nevek figyelése

  for (const file of files.sort()) {
    const ext = path.extname(file).toLowerCase();
    if (!SUPPORTED.has(ext)) {
      if (ext === ".heic" || ext === ".heif") {
        console.warn(`! ${file}: HEIC (iPhone) formátum nem támogatott - mentsd JPG-ként, vagy iPhone-on: Beállítások > Kamera > Formátumok > "Leginkább kompatibilis".`);
      }
      continue;
    }

    const src = path.join(IN_DIR, file);
    const name = slugify(path.parse(file).name) || "kep";
    if (seen.has(name)) {
      console.warn(`! ${file}: ugyanazt a nevet kapná, mint "${seen.get(name)}" (${name}.webp) - nevezd át az egyiket.`);
      failed++;
      continue;
    }
    seen.set(name, file);
    const out = path.join(OUT_DIR, `${name}.webp`);

    const srcStat = await stat(src);
    const outStat = await stat(out).catch(() => null);
    if (!FORCE && outStat && outStat.mtimeMs >= srcStat.mtimeMs) {
      skipped++;
      continue;
    }

    try {
      const info = await sharp(src)
        .rotate() // EXIF szerinti elforgatás
        .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(out); // a metaadatok alapból nem kerülnek át
      before += srcStat.size;
      after += info.size;
      done++;
      console.log(`✓ ${file} -> ${path.basename(out)}  ${info.width}x${info.height}  ${kb(srcStat.size)} -> ${kb(info.size)}`);
    } catch (err) {
      failed++;
      console.error(`✗ ${file}: ${err.message}`);
    }
  }

  console.log(`\nKész: ${done} átalakítva, ${skipped} kihagyva (már naprakész), ${failed} hiba.`);
  if (done) console.log(`Méret: ${kb(before)} -> ${kb(after)}`);
  if (failed) process.exit(1);
}

main();
