import { readFileSync } from 'fs';

const input = readFileSync(0, { encoding: 'utf8' });
const lines = input.trim().split('\n');
let totalSum = 0;
for (const line of lines) {
    const nums = line.split(',').map(Number);
    for (const num of nums) {
        if (!Number.isNaN(num)) {
            totalSum += num as number; // TypeScript doesn't allow summing a generic array directly here, casting is necessary. 
        } else throw new Error("Invalid input");
}

console.log(`count=${totalCount} sum=${totalSum}`);
