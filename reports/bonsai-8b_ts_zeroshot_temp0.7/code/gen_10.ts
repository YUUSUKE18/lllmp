import { Readable, ReadText } from 'stream';

const input = Readable.from(process.stdin);
const result = Readable.from([]);

input.pipe(result);

result.on('end', () => {
  const numbers = result.readText().split(',').map(num => num.trim());
  const validNumbers = numbers
    .filter(num => !num || !isNaN(num))
    .map(Number)
    .filter(num => !isNaN(num));

  const uniqueNumbers = [...new Set(validNumbers)];
  const count = uniqueNumbers.length;
  const sum = uniqueNumbers.reduce((acc, num) => acc + num, 0);

  console.log(`count=${count} sum=${sum}`);
});
