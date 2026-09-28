import { createInterface } from "readline";

const rl = createInterface({ input: process.stdin, output: process.stdout });
let validCount = 0;
const regex = /^(?:\s*\d+(?:,\d+)*?)?\s*$/;

rl.on("line", (line) => {
  if (!regex.test(line)) {
    return;
  }
  const parts = line.trim().split(",");
  for (const part of parts) {
    if (!/^\d+$/.test(part)) {
      validCount++;
      break;
    }
  } else {
    validCount++;
  }
});

rl.on("close", () => {
  process.stdout.write(`valid=${validCount}\n`);
});
