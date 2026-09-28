import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();

if (!input) {
    console.log('count=0 sum=0');
    process.exit(0);
}

const parts = input.split(',');
let count = 0n;
let sum = 0n;

for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    const match = trimmed.match(/^(\d+)\:(\d+)$/);
    if (!match) continue;

    const value = BigInt(match[1]);
    const times = BigInt(match[2]);

    count += times;
    sum += value * times;
}

console.log(`count=${count} sum=${sum}`);
