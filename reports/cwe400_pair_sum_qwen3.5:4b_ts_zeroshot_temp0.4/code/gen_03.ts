import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').split('\n');
const target = parseInt(input[0], 10);

let count = 0;
const nums: number[] = [];

for (let i = 1; i < input.length; i++) {
    const line = input[i].trim();
    if (!line) continue;
    const num = parseInt(line, 10);
    if (isNaN(num)) continue;
    nums.push(num);
}

const n = nums.length;
if (n < 2) {
    console.log('pairs=0');
    process.exit(0);
}

for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
        if (nums[i] + nums[j] === target) {
            count++;
        }
    }
}

console.log(`pairs=${count}`);
