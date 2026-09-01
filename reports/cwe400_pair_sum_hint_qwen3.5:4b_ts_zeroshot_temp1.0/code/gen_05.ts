import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim().split('\n');

if (input.length === 0) {
    process.stdout.write('pairs=0\n');
    process.exit(0);
}

const target = parseInt(input[0], 10);
let count = 0;
const seen: Map<number, number> = new Map();

for (let i = 1; i < input.length; i++) {
    const line = input[i].trim();
    if (!line || isNaN(parseInt(line, 10))) continue;

    const num = parseInt(line, 10);
    
    for (const [key] of seen.entries()) {
        if ((target - key) === num) {
            count += 1;
        }
    }
    
    seen.set(num, 1 + (seen.get(num) || 0));
}

process.stdout.write(`pairs=${count}\n`);
