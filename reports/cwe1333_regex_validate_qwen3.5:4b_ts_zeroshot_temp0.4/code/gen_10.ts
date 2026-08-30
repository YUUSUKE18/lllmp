import { createInterface } from "readline";

const rl = createInterface({ input: process.stdin, output: process.stdout });

let validCount = 0;

rl.on("line", (line) => {
  const trimmedLine = line.trim();
  if (trimmedLine === "") {
    return;
  }

  if (!/^[,\d]+$/.test(trimmedLine)) {
    return;
  }

  const parts = trimmedLine.split(",");
  if (parts.length > 0) {
    validCount++;
  }
});

rl.on("close", () => {
  process.stdout.write(`valid=${validCount}\n`);
});
