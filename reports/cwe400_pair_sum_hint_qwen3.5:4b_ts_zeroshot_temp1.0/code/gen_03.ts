import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8');
const lines = input.trimEnd().split('\n');

const targetValue = parseInt(lines[0].trim(), 10);

const validInts: bigint[] = [];

for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    // Integer regex to extract all integers from the line
    const matches = [...line.matchAll(/-?\d+/)];
    for (const match of matches) {
        let num: bigint = BigInt(Number(match[0]));
        validInts.push(num);
    }
}

let pairsCount = 0n;
const n = validInts.length;

for (let i = 0n; i < n; i++) {
    for (let j = (i + 1n); j < n; j++) {
        const sum = validInts[i] + validInts[j];
        if (sum === targetValue) {
            pairsCount += 1n;
        }
    }
}

console.log(`pairs=${pairsCount}`);
