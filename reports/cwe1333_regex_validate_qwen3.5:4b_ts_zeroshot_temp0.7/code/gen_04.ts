import { createInterface } from "readline";

const rl = createInterface({ input: process.stdin, output: process.stdout });
let validCount = 0;

rl.on("line", (line) => {
  if (line === "") return;
  const trimmed = line.trim();
  if (!trimmed.startsWith(",")) {
    return;
  }
  const parts = trimmed.split(",");
  for (const part of parts) {
    if (/[^0-9]/.test(part)) return;
  }
  validCount++;
});

rl.on("close", () => {
  console.log(`valid=${validCount}`);
});
