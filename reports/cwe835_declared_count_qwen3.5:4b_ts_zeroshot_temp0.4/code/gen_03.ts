import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const lines = input.split('\n');
const firstLine = parseInt(lines[0], 10);

let count = 0;
let sum = BigInt(0);

for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '') continue;

    const num = parseInt(line, 10);
    if (isNaN(num)) continue;

    count++;
    sum += BigInt(num);
}

console.log(`count=${count} sum=${sum}`);
