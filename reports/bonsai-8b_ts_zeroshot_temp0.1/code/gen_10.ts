import { Readable } from 'stream';

const input = Readable.from(process.stdin);

input.on('line', line => {
  const numbers = line
    .split(',')
    .map(num => num.trim())
    .filter(num => !num === '' && /^\d+$/.test(num))
    .map(Number);

  const uniqueNumbers = [...new Set(numbers)];
  const count = uniqueNumbers.length;
  const sum = uniqueNumbers.reduce((a, b) => a + b, 0);

  console.log(`count=${count} sum=${sum}`);
});
