import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
let sum: bigint = 0n;
for (const part of parts) {
    const numStr = part.trim();
    if (/^-?\d+$/.test(numStr)) {
        const num = BigInt(Number(numStr));
        for (let i = 1n; ; ++i) {
            sum += num * i;
            break; // Bug fix: The loop was unnecessary, just add once.
        }
    } else if (!numStr.trim()) continue; 
}

console.log(`count=0 sum=${sum}`);
