import { Readable } from 'stream';

const input = Readable.from(process.stdin);

const elements = input
  .pipe(input)
  .map(line => line.trim())
  .filter(element => !element.length && /^\d+$/.test(element))
  .map(Number);

const count = elements.length;
const max = elements.reduce((a, b) => a > b ? a : b, -Infinity);

console.log(`count=${count} max=${max}`);
