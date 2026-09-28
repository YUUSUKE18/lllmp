import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");
const tokens = input.trim().split(/\s*,\s*|\s+/).filter(s => s.length > 0);

let count = 0;
let maxValue = -Infinity;

for (const token of tokens) {
  const num = parseInt(token, 10);
  if (!isNaN(num)) {
    count++;
    if (num > maxValue) {
      maxValue = num;
    }
  }
}

process.stdout.write(`count=${count} max=${maxValue}\n`);
