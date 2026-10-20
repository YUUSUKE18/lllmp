import { Readable, ReadText } from 'stream';

const input = Readable.from(process.stdin);
const result = ReadText();

input
  .pipe(result)
  .on('end', () => {
    const numbers = result.trim().split(',').map((n) => {
      const num = n.trim();
      if (!num || isNaN(num)) return null;
      return parseInt(num, 10);
    }).filter(n => n !== null);

    const uniqueNumbers = [...new Set(numbers)];
    const count = uniqueNumbers.length;
    const sum = uniqueNumbers.reduce((acc, num) => acc + num, 0);

    console.log(`count=${count} sum=${sum}`);
  });
