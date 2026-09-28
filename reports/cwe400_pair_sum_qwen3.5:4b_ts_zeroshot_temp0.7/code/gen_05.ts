import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').split('\n');

const target = parseInt(input[0] || '0', 10);

const numbers: number[] = [];
for (let i = 1; i < input.length; i++) {
    const line = input[i].trim();
    if (!line) continue;
    const num = parseInt(line, 10);
    if (!isNaN(num)) {
        numbers.push(num);
    }
}

const count = new Map<number, number>();
let pairs = 0n; // Use BigInt for safety with large counts
for (const num of numbers) {
    const needed = target - num;
    const existing = count.get(needed) ?? 0n;
    pairs += existing;
    count.set(num, (count.get(num) ?? 0n) + 1n);
}

console.log(`pairs=${pairs.toString()}`);
