import { Readable } from 'stream';

const input = Readable.from(process.stdin);

const numbers = [];

input.on('data', chunk => {
  const value = chunk.trim();
  if (/^-?\d+$/.test(value)) {
    numbers.push(parseInt(value));
  }
});

input.on('end', () => {
  const uniqueNumbers = new Set(numbers);
  const count = uniqueNumbers.size;
  const sum = uniqueNumbers.values.reduce((a, b) => a + b, 0);

  console.log(`count=${count} sum=${sum}`);
});
