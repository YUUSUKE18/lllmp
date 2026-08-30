import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const numbers: number[] = [];
for (const token of input.split(',')) {
    const num = Number(token.trim());
    if (!isNaN(num) && isFinite(num)) {
        numbers.push(num);
    }
}

const uniqueNumbers = new Set(numbers);
let sum = 0;
uniqueNumbers.forEach((n: number) => (sum += n));

console.log(`count=${uniqueNumbers.size} sum=${sum}`);
