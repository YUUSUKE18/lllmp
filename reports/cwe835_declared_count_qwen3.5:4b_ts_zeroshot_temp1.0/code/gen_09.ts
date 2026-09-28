import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf-8').split('\n');

let lines = [];
for (const line of input) {
    const trimmed = line.trim();
    if (trimmed === '') continue;
    const parsed = parseInt(trimmed, 10);
    if (!Number.isNaN(parsed)) {
        lines.push(parsed);
    }
}

if (lines.length === 0) {
    console.log(`count=0 sum=0`);
    process.exit(0);
}

const total = lines.reduce((sum, val) => sum + val, 0n);
console.log(`count=${lines.length} sum=${total}`);
