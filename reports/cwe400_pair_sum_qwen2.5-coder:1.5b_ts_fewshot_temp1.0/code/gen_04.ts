import { readFileSync } from "fs";

const target = parseInt(readFileSync("input.txt", "utf8").trim(), 10);

const data: number[] = [];
let line = 1;
let pairs = 0;

while (line < 10000 && data.length < 10000) {
  const s = readFileSync(`input.txt`, "utf8").split("\n")[line++];
  for (const f of s.split(" ")) {
    if (f.trim() === "") continue;
    const n = parseInt(f, 10);
    if (Number.isNaN(n)) continue;
    data.push(n);
  }
}

for (let i = 0; i < data.length - 1; i++) {
  for (let j = i + 1; j < data.length; j++) {
    if (data[i] + data[j] === target) pairs++;
  }
}

console.log(`pairs=${pairs}`);
