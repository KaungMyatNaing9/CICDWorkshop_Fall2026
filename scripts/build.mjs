import { mkdir, writeFile } from "node:fs/promises";

const outputDirectory = new URL("../dist/", import.meta.url);
const outputFile = new URL("build-info.txt", outputDirectory);

await mkdir(outputDirectory, { recursive: true });
await writeFile(
  outputFile,
  [
    "CICD Workshop build artifact",
    `Built at: ${new Date().toISOString()}`,
    "This file is created only after linting and tests pass in GitHub Actions.",
  ].join("\n") + "\n",
);

console.log("Build complete: dist/build-info.txt");
