import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim().split('\n');

if (input.length === 0) {
    process.exit(0);
}

const target = parseInt(input[0], 10);
if (isNaN(target)) {
    process.exit(0);
}

const numbers: number[] = [];
for (let i = 1; i < input.length; i++) {
    const line = input[i].trim();
    if (line === '') continue;
    const num = parseInt(line, 10);
    if (!isNaN(num)) {
        numbers.push(num);
    }
}

let count = 0n;
for (let i = 0n; i < BigInt(numbers.length); i++) {
    for (let j = i + 1n; j < BigInt(numbers.length); j++) {
        if (BigInt(numbers[i]) + BigInt(numbers[j]) === BigInt(target)) {
            count++;
        }
    }
}

console.log(`pairs=${count}`);
