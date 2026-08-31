import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const lines = input.split('\n');
const countLine = lines[0].trim();
if (countLine === '') process.exit(0);

const expectedCount: number = parseInt(countLine, 10);

let sum: bigint = 0n;
let actualCount: number = 0;

for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '') continue;

    const parts = line.split(/\s+/);
    for (const part of parts) {
        const num: number | null = parseInt(part, 10);
        if (num === null || isNaN(num)) continue;

        sum += BigInt(num);
        actualCount++;
    }
}

console.log(`count=${actualCount} sum=${sum}`);
