import { Readable } from 'stream';

const input = Readable.from(process.stdin);

input.on('line', line => {
  const numbers = line
    .split(',')
    .map(num => {
      const trimmed = num.trim();
      if (!trimmed) return null;
      const parsed = parseInt(trimmed, 10);
      if (isNaN(parsed)) return null;
      return parsed;
    })
    .filter(num => num !== null)
    .map(num => num.toString());

  const count = numbers.length;
  const max = numbers.reduce((a, b) => a > b ? a : b);

  console.log(`count=${count} max=${max}`);
});
