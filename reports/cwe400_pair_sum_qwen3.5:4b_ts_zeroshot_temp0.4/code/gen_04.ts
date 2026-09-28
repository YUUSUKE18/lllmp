import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8');
const lines = input.split('\n').filter(line => line.trim() !== '');

if (lines.length < 2) {
    console.log('pairs=0\n');
    process.exit(0);
}

const target = parseInt(lines[0], 10);
const nums: number[] = [];
for (let i = 1; i < lines.length; i++) {
    const val = parseInt(lines[i].trim(), 10);
    if (!isNaN(val)) {
        nums.push(val);
    }
}

let count = 0n;
const n = nums.length;

for (let i = 0n; i < BigInt(n); i++) {
    for (let j = i + 1n; j < BigInt(n); j++) {
        if ((BigInt(nums[i]) + BigInt(nums[j])) === BigInt(target)) {
            count++;
        }
    }
}

console.log(`pairs=${count}\n`);
