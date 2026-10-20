import { Readable, ReadText } from 'stream';

const input = Readable.from(process.stdin);
const result = Readable.createTextStream();

input.pipe(result);

result.on('end', () => {
  const data = input.readText().split(',').map(item => item.trim());
  const numbers = data
    .filter(item => /^\d+$/.test(item))
    .map(Number);

  const uniqueNumbers = [...new Set(numbers)];
  const count = uniqueNumbers.length;
  const sum = uniqueNumbers.reduce((acc, num) => acc + num, 0);

  result.write(`count=${count} sum=${sum}\n`);
  result.end();
});
