const esbuild = require("esbuild");

const buildOptions = {
  entryPoints: ["src/index.js"], // Entry point for your application
  bundle: true, // Bundle the application
  outfile: "dist/bundle.js", // Output file for the bundled code
  minify: true, // Minify the output code
  sourcemap: true, // Generate source maps for debugging
  loader: { ".js": "js", ".jsx": "jsx", ".ts": "ts", ".css": "css" },
};

async function runBuiild() {
  const isWatchMode = process.argv.includes("--watch");
  if (!isWatchMode) {
    console.log("Building the project...");
    const ctx = await esbuild.context(buildOptions);
    await ctx.watch();
    console.log("Watching for changes...");
  } else {
    await esbuild
      .build(buildOptions)
      .then(() => {
        console.log("Build completed successfully!");
      })
      .catch((error) => {
        console.error("Build failed:", error);
      });
  }
}

runBuiild().catch((error) => {
  console.error("Error during build:", error);
  process.exit(1);
});
