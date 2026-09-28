import { Readable, ReadLines } from 'stream';

const input = Readable.from(process.stdin);
const lines = input.pipe(ReadLines);

const count = 0;
let sum = 0;

for await (const line of lines) {
  const matches = line.match(/\d+/g);
  if (matches) {
    count += matches.length;
    sum += matches.reduce((a, b) => a + parseInt(b, 10), 0);
  }
}

console.log(`count=${count} sum=${sum}`);
