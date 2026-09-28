import { readFileSync } from "fs";

const input = readFileSync(0, "utf8").trim();
if (!input) process.exit(0);

try {
    const numbers: number[] = input.split(",").map((s) => Number(s));
} catch {}

let totalSum = 0;
for (let i of new Set(numbers)) {
    if (!(Number.isInteger(i))) continue;
    totalSum += i;
}

console.log(`count=${new Set(numbers).size} sum=${totalSum}`);
