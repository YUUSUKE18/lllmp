import { readFileSync } from "fs";

const target = parseInt(readFileSync(process.stdin.path, "utf8").trim(), 10);
const inputs = readFileSync(process.stdin.path, "utf8").trim().split("\n").filter(Boolean).map(Number);

let pairsCount = 0;
for (let i = 0; i < inputs.length - 1; i++) {
  for (let j = i + 1; j < inputs.length; j++) {
    if (inputs[i] + inputs[j] === target) {
      pairsCount++;
    }
  }
}

console.log(`pairs=${pairsCount}`);
