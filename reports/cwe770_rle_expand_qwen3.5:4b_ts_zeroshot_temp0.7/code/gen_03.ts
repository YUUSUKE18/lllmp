import { readFileSync } from "fs";

const input = readFileSync(0, "utf8").trim();
let total: number = 0;
let count: number = 0;

for (const part of input.split(",")) {
    const match = part.match(/^(\d+)\:(\d+)$/);
    if (!match) continue;
    const val = parseInt(match[1], 10);
    const times = parseInt(match[2], 10);
    count += times;
    total += val * times;
}

console.log(`count=${count} sum=${total}`);
