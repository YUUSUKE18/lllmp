import { Readable, ReadTextStream } from 'stream';

const input = Readable.from(process.stdin);

const numbers = [];
let line = '';

for await (const chunk of input) {
  line += chunk;
  if (line.trim() !== '') {
    const tokens = line.trim().split(/\s+/);
    let value = 0;
    let sign = 1;
    for (const token of tokens) {
      if (!token || isNaN(token)) continue;
      sign = sign * (value > 0 ? 1 : -1);
      value = value * 10 + parseInt(token);
    }
    numbers.push(sign * value);
    line = '';
  }
}

const target = numbers[0];
const validNumbers = numbers.slice(1).filter(n => !isNaN(n) && n !== 0);
const validNumbers = validNumbers.map(n => n > 0 ? n : -n);

const count = 0;
const seen = new Set();

for (let i = 0; i < validNumbers.length; i++) {
  for (let j = i + 1; j < validNumbers.length; j++) {
    const a = validNumbers[i];
    const b = validNumbers[j];
    if (a + b === target && a !== b) {
      count++;
      seen.add(i);
      seen.add(j);
    }
  }
}

const pairs = Array.from(seen).map(i => i + 1);
pairs.sort((a, b) => a - b);

const output = `pairs=${pairs.length}`;
console.log(output);
