import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf-8');
let count = 0n;
let sum = 0n;

input.split(',').forEach((line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine.includes(':')) return;

    const parts = trimmedLine.split(':');
    if (parts.length !== 2) return;

    const valueStr = parts[0].trim();
    const countStr = parts[1].trim();

    if (!/^-?\d+$/.test(valueStr) || !/^-?\d+$/.test(countStr)) return;

    const value = BigInt(valueStr);
    const cnt = BigInt(countStr);

    count += cnt;
    sum += value * cnt;
});

console.log(`count=${count} sum=${sum}`);
