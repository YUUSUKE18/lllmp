import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim().split('\n');

if (input.length === 0) {
    console.log('pairs=0\n');
    process.exit(0);
}

const target = parseInt(input[0], 10);
if (isNaN(target)) {
    console.log('pairs=0\n');
    process.exit(0);
}

const lines = input.slice(1).filter(line => line.trim() !== '');
const numbers: number[] = [];

for (const line of lines) {
    const parts = line.split(/\s+/);
    for (const part of parts) {
        const num = parseInt(part, 10);
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }
}

if (numbers.length < 2) {
    console.log('pairs=0\n');
    process.exit(0);
}

let count = 0n;
const n = numbers.length;
const targetBig = BigInt(target);

for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
        const sum = BigInt(numbers[i]) + BigInt(numbers[j]);
        if (sum === targetBig) {
            count++;
        }
    }
}

console.log(`pairs=${count}\n`);
