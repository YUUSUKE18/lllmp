import { Readable } from 'stream';

const input = process.stdin;

const elements = [];
let buffer = '';

for await (const chunk of input.readableStream()) {
  buffer += chunk;
}

elements = buffer
  .split(',')
  .map(e => e.trim())
  .filter(e => /^\d+$/.test(e))
  .map(Number);

const count = elements.length;
const max = elements.reduce((a, b) => a > b ? a : b);

console.log(`count=${count} max=${max}`);
