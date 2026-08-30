import * as fs from "fs";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let input = "";

rl.on("line", (line) => {
  input += line + "\n";
});

rl.on("close", () => {
  const parts = input.trim().split(',');
  let count = 0;
  let maxVal = -Infinity;
  let validCount = 0;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);
    if (!isNaN(num)) {
      validCount++;
      if (num > maxVal) {
        maxVal = num;
      }
    }
  }

  process.stdout.write(`count=${validCount} max=${maxVal}\n`);
});
