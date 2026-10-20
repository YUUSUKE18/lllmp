import { Readable, ReadText } from 'stream';

const input = Readable.from(process.stdin);

input.on('data', (data) => {
  const items = data.toString().split(',').map(item => item.trim());
  const numbers = items
    .filter(item => /^\d+$/.test(item))
    .map(Number);

  const uniqueNumbers = [...new Set(numbers)];
  const count = uniqueNumbers.length;
  const sum = uniqueNumbers.reduce((acc, num) => acc + num, 0);

  console.log(`count=${count} sum=${sum}`);
});
