import { createInterface } from "readline";

const rl = createInterface({ input: process.stdin, output: process.stdout });

let validCount = 0;

rl.on("line", (line) => {
  const trimmed = line.trim();
  if (trimmed === "") {
    return;
  }
  const parts = trimmed.split(",");
  const isValid = parts.every((part) => /^\s*-?\d+\s*$/.test(part));
  if (isValid && parts.length > 0) {
    validCount++;
  }
});

rl.on("close", () => {
  process.stdout.write(`valid=${validCount}\n`);
});
