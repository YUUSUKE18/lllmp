import { Readable, Read } from 'stream';

const input = Readable.from(process.stdin);

input.on('line', line => {
  const elements = line.trim().split(',').map(e => e.trim());
  const validElements = elements.filter(e => !e || isNaN(parseInt(e, 10)));

  const count = validElements.length;
  const max = validElements
    .map(Number)
    .reduce((a, b) => Math.max(a, b), -Infinity);

  console.log(`count=${count} max=${max}`);
});
