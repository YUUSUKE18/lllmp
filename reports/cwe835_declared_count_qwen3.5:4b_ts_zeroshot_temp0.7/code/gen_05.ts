import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf-8').trim().split('\n');

let count: number = 0;
let sum: bigint = 0n;

for (const line of input) {
    if (line.trim() === '') continue;
    
    for (const token of line.split(/\s+/)) {
        const value = BigInt(token);
        if (!isNaN(value as any)) { // Check if it's a valid integer
            count++;
            sum += value;
        }
    }
}

console.log(`count=${count} sum=${sum}`);
