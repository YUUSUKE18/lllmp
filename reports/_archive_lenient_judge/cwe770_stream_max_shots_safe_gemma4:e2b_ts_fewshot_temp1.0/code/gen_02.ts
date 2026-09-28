import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");

const parts = input.trim().split(',');

let count = 0;
let maxValue = -Infinity;
let validCount = 0;

for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);
    if (!isNaN(num)) {
        validCount++;
        if (num > maxValue) {
            maxValue = num;
        }
    }
}

process.stdout.write(`count=${validCount} max=${maxValue}\n`);
