import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim().split('\n');

if (input.length < 2) {
    console.log('pairs=0\n');
    process.exit(0);
}

const target = parseInt(input[0], 10);
const lines = input.slice(1).filter(line => line.trim() !== '');

const nums: number[] = [];
for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.match(/^-?\d+$/)) continue;
    nums.push(parseInt(trimmed, 10));
}

if (nums.length < 2) {
    console.log('pairs=0\n');
    process.exit(0);
}

let count = 0n;
const n = nums.length;
for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
        if ((BigInt(nums[i]) + BigInt(nums[j])) === BigInt(target)) {
            count++;
        }
    }
}

console.log(`pairs=${count}\n`);
