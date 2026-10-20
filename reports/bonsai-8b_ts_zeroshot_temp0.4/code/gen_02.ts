import { Readable } from 'stream';

const input = Readable.from(process.stdin);

input.on('line', line => {
  const numbers = line
    .split(',')
    .map(num => num.trim())
    .filter(num => !isNaN(num) && num.length > 0)
    .map(Number);

  const uniqueNumbers = [...new Set(numbers)];
  const count = uniqueNumbers.length;
  const sum = uniqueNumbers.reduce((acc, num) => acc + num, 0);

  console.log(`count=${count} sum=${sum}`);
});
