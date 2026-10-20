import { Readable, ReadText } from 'stream';

const input = Readable.from(process.stdin);
const result = ReadText();

input.pipe(result)
  .on('end', () => {
    const numbers = result.trim().split(',').map(n => {
      const num = n.trim();
      if (!num || isNaN(num)) return null;
      return parseInt(num, 10);
    }).filter(n => n !== null).reduce((acc, num) => {
      acc[num] = (acc[num] || 0) + 1;
      return acc;
    }, {});

    const count = Object.keys(result).length - Object.keys(result).filter(k => !result[k]).length;
    const sum = Object.values(result).reduce((acc, val) => acc + val, 0);

    console.log(`count=${count} sum=${sum}`);
  });
