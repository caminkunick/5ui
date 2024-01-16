const esbuild = require("esbuild");
const terser = require("terser");
const fs = require("fs");
const sass = require("sass");
const path = require("path");

(async () => {
  // clear dist folder
  folder = path.join(__dirname, "dist");
  fs.rmdirSync(folder, { recursive: true });

  await esbuild
    .build({
      entryPoints: [path.join(__dirname, "src/index.tsx")],
      bundle: true,
      outfile: path.join(__dirname, "dist/index.min.js"),
      platform: "browser",
      target: "es6",
      define: {
        "process.env.NODE_ENV": '"production"',
      },
    })
    .catch(() => process.exit(1));

  // obfuscate dist/index.min.js file
  const minified = fs.readFileSync(
    path.join(__dirname, "dist/index.min.js"),
    "utf8"
  );
  const result = await terser.minify(minified, {
    mangle: {
      toplevel: true,
      properties: {
        regex: /^_/,
      },
    },
  });
  // write obfuscated code to dist/index.min.js
  fs.writeFileSync(path.join(__dirname, "dist/index.js"), result.code);

  // remove dist/index.min.js
  fs.unlinkSync(path.join(__dirname, "dist/index.min.js"));

  // build scss to css
  const css = sass
    .renderSync({ file: path.join(__dirname, "src/index.scss") })
    .css.toString();
  fs.writeFileSync(path.join(__dirname, "dist/index.css"), css);

  // copy from public folder to dist folder except index.js index.js.map and index.css
  fs.readdirSync(path.join(__dirname, "public")).forEach((file) => {
    if (
      file !== "index.js" &&
      file !== "index.js.map" &&
      file !== "index.css"
    ) {
      fs.copyFileSync(
        path.join(__dirname, `public/${file}`),
        path.join(__dirname, `dist/${file}`)
      );
    }
  });
})();
