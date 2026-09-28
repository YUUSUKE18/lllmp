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

const numbers: number[] = [];
for (let i = 1; i < input.length; i++) {
    const line = input[i].trim();
    if (line === '') continue;
    const num = parseInt(line, 10);
    if (!isNaN(num)) {
        numbers.push(num);
    }
}

const count = new Map<number, number>();
let pairs = 0n;

for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    const complement = target - num;
    
    if (count.has(complement)) {
        pairs += BigInt(count.get(complement)!);
    }
    count.set(num, (count.get(num) ?? 0n) + 1n);
}

console.log(`pairs=${pairs}\n`);
