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

const lines = input.slice(1);
const numbers: number[] = [];

for (const line of lines) {
    if (!line.trim() || isNaN(parseInt(line, 10))) {
        continue;
    }
    const num = parseInt(line, 10);
    if (!isNaN(num)) {
        numbers.push(num);
    }
}

const count: number[] = new Array(numbers.length).fill(0);

for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
        if (numbers[i] + numbers[j] === target) {
            count[i]++;
            count[j]++;
        }
    }
}

const totalPairs = count.reduce((sum, val) => sum + val, 0);
console.log(`pairs=${totalPairs}\n`);
