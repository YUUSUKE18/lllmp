import { readFileSync } from "fs";

const input = readFileSync(0, "utf8").trim();
if (!input) process.exit(0);

const lines = input.split("\n");
const firstLine = parseInt(lines[0], 10);
let count = 0;
let sum = 0;

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line === "") continue;
  
  const token = parseInt(line, 10);
  if (isNaN(token)) continue;
  
  sum += token;
  count++;
}

console.log(`count=${count} sum=${sum}`);
