import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) {
  console.log('count=0 sum=0\n');
  process.exit(0);
}

const tokens = input.split(',').map(s => s.trim()).filter(s => s !== '');

const numbers: number[] = [];
for (const token of tokens) {
  const num = parseInt(token, 10);
  if (!isNaN(num)) {
    numbers.push(num);
  }
}

const uniqueNumbers = new Set(numbers);
const count = uniqueNumbers.size;
const sum = [...uniqueNumbers].reduce((acc, val) => acc + val, 0);

console.log(`count=${count} sum=${sum}\n`);
