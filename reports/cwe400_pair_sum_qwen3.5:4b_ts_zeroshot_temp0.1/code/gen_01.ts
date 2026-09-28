import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim().split('\n');

if (input.length === 0) {
    console.log('pairs=0\n');
    process.exit(0);
}

const target = parseInt(input[0], 10);
const numbers: number[] = [];

for (let i = 1; i < input.length; i++) {
    const line = input[i].trim();
    if (line === '') continue;
    const num = parseInt(line, 10);
    if (!isNaN(num)) {
        numbers.push(num);
    }
}

const n = numbers.length;
let count = 0n;

for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
        if ((BigInt(numbers[i]) + BigInt(numbers[j])) === BigInt(target)) {
            count++;
        }
    }
}

console.log(`pairs=${count}\n`);
