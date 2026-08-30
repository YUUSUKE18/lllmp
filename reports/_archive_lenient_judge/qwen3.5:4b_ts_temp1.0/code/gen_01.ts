import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const numbers: string[] = [];
for (const part of input.split(',')) {
  if (/^-?\d+$/.test(part.trim())) {
    numbers.push(parseInt(part.trim(), 10));
  } else {
    continue; 
}
if (!input || !numbers.length) process.exit(0);

const sum = new Number(); for ( const n of [...new Set(numbers)] ) : sum += n, count++;
console.log(`count=${count} sum=${sum}`);
