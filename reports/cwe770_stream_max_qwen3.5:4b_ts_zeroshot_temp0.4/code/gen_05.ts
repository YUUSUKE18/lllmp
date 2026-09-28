import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const tokens = input.split(/[,\s]+/).map(Number).filter(n => !isNaN(n));

let count = 0;
let max: number | null = null;

for (const n of tokens) {
    if (max === null || n > max) {
        max = n;
    }
    count++;
}

if (!count && !max) console.log(`count=0 max=`);
else if (!max) console.log(`count=${count} max=`);
else console.log(`count=${count} max=${max}`);
