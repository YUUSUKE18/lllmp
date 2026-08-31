import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim().split('\n');

let count = 0;
let sum = BigInt(0);

if (input.length > 1) {
    const firstLine = input[0];
    const expectedCount: bigint = BigInt(firstLine.trim());

    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line === '') continue;

        const value = parseInt(line, 10);
        if (isNaN(value)) continue;

        sum += BigInt(value);
        count++;
    }
}

console.log(`count=${count} sum=${sum}`);
