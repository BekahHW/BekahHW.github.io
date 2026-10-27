// Generates looseleaf-style social preview cards (1200x630 PNG) for posts.
// Runs after `jekyll build`: reads _site/og-cards.json and writes
// _site/assets/images/og/<slug>.png for each entry.
//
//   npm run og                 build every card
//   npm run og -- --only=slug  build one card (handy for previewing)

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const require = createRequire(import.meta.url);
const SITE = path.resolve("_site");
const OUT = path.join(SITE, "assets/images/og");
const WIDTH = 1200;
const HEIGHT = 630;

// Mirrors the :root tokens in _sass/_looseleaf.scss
const colors = {
  paper: "#FBFAF6",
  ruleBlue: "#C9D7E4",
  marginRed: "#D6453D",
  ink: "#1F2A3D",
  ballpoint: "#2456A6",
  pencil: "#6B7280",
};

const font = (pkg, file) => readFile(require.resolve(`@fontsource/${pkg}/files/${file}`));

const fonts = [
  { name: "Young Serif", data: await font("young-serif", "young-serif-latin-400-normal.woff"), weight: 400 },
  { name: "Source Serif 4", data: await font("source-serif-4", "source-serif-4-latin-400-normal.woff"), weight: 400 },
  { name: "IBM Plex Mono", data: await font("ibm-plex-mono", "ibm-plex-mono-latin-500-normal.woff"), weight: 500 },
  { name: "Caveat", data: await font("caveat", "caveat-latin-600-normal.woff"), weight: 600 },
];

// Tiny hyperscript helper so the card reads like markup
const h = (type, style, ...children) => ({
  type,
  props: { style: { display: "flex", ...style }, children: children.flat() },
});

function titleSize(title) {
  if (title.length <= 32) return 80;
  if (title.length <= 55) return 68;
  if (title.length <= 80) return 58;
  return 50;
}

// About two lines of description at 29px; satori has no reliable line clamp
function clip(text, max) {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/[\s,.;:!?-]+\S*$/, "") + "…";
}

function card({ title, description, date, tags }) {
  const rules = [];
  for (let y = 70; y < HEIGHT; y += 44) {
    rules.push(h("div", { position: "absolute", left: 0, right: 0, top: y, height: 2, backgroundColor: colors.ruleBlue, opacity: 0.55 }));
  }

  const holes = [130, 315, 500].map((y) =>
    h("div", {
      position: "absolute",
      left: 34,
      top: y - 18,
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: "#E9E6DC",
      boxShadow: "inset 0 3px 5px rgba(31, 42, 61, 0.18)",
    })
  );

  const eyebrow = (tags || []).map((t) => String(t).toUpperCase()).join("  ·  ");

  return h(
    "div",
    { width: WIDTH, height: HEIGHT, position: "relative", backgroundColor: colors.paper, fontFamily: "Source Serif 4", color: colors.ink },
    rules,
    holes,
    h("div", { position: "absolute", top: 0, bottom: 0, left: 112, width: 3, backgroundColor: colors.marginRed, opacity: 0.6 }),
    h(
      "div",
      { position: "absolute", top: 0, left: 160, right: 70, bottom: 0, flexDirection: "column", paddingTop: 52, paddingBottom: 48 },
      h(
        "div",
        { justifyContent: "space-between", alignItems: "center" },
        h("div", { fontFamily: "Young Serif", fontSize: 34 }, "BekahHW"),
        h("div", { fontFamily: "IBM Plex Mono", fontSize: 18, letterSpacing: 2, color: colors.pencil }, eyebrow)
      ),
      h(
        "div",
        { flexDirection: "column", flexGrow: 1, justifyContent: "center" },
        h("div", { fontFamily: "Young Serif", fontSize: titleSize(title), lineHeight: 1.12, letterSpacing: -0.5 }, title),
        description
          ? h("div", { marginTop: 26, fontSize: 29, lineHeight: 1.4, color: colors.pencil, maxHeight: 82, overflow: "hidden" }, clip(description, title.length > 80 ? 62 : 125))
          : []
      ),
      h(
        "div",
        { justifyContent: "space-between", alignItems: "flex-end" },
        h("div", { fontFamily: "IBM Plex Mono", fontSize: 20, color: colors.ballpoint }, "bekahhw.com"),
        h("div", { fontFamily: "IBM Plex Mono", fontSize: 18, color: colors.pencil }, date || "")
      )
    ),
    h("div", { position: "absolute", left: 6, bottom: 34, fontFamily: "Caveat", fontSize: 34, color: colors.marginRed, transform: "rotate(-8deg)" }, "read me!")
  );
}

const only = process.argv.find((a) => a.startsWith("--only="))?.slice(7);
const posts = JSON.parse(await readFile(path.join(SITE, "og-cards.json"), "utf8"));
const todo = only ? posts.filter((p) => p.slug === only) : posts;

await mkdir(OUT, { recursive: true });
for (const post of todo) {
  const svg = await satori(card(post), { width: WIDTH, height: HEIGHT, fonts });
  const png = new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } }).render().asPng();
  await writeFile(path.join(OUT, `${post.slug}.png`), png);
}
console.log(`og-cards: wrote ${todo.length} card(s) to ${path.relative(process.cwd(), OUT)}`);
