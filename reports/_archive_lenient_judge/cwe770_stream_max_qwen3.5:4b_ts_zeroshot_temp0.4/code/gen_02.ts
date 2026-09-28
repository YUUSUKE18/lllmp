import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const tokens = input.split(/[\s,,]+/).map(Number).filter(n => !isNaN(n));

let count = 0;
let maxVal: number | null = null;

for (const val of tokens) {
    if (!maxVal || val > maxVal) {
        maxVal = val;
    }
    count++;
}

console.log(`count=${count} max=${maxVal}`);
