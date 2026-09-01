import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim().split('\n');

if (input.length < 2) {
    console.log('pairs=0\n');
    process.exit(0);
}

const target = parseInt(input[0], 10);
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

const count = new Map<number, number>();
let pairs = 0;

for (let i = 0; i < numbers.length; i++) {
    const num1 = numbers[i];
    if (!count.has(num1)) {
        count.set(num1, 0);
    }
    
    const needed = target - num1;
    const countNeeded = count.get(needed) || 0;
    
    pairs += countNeeded;
    
    count.set(num1, (count.get(num1) || 0) + 1);
}

console.log(`pairs=${pairs}\n`);
