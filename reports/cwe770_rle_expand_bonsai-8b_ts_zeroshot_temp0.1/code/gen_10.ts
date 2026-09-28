import { Readable } from 'stream';

const input = process.stdin.readable();
const reader = input.createReader({ stream: true });

let values: number[] = [];
let counts: number[] = [];

reader.on('data', (data) => {
  const parts = data.toString().split(',').filter(Boolean);
  parts.forEach((part) => {
    const [valueStr, countStr] = part.split(':').filter(Boolean);
    const value = parseInt(valueStr, 10);
    const count = parseInt(countStr, 10);
    if (!isNaN(value) && !isNaN(count) && count >= 0) {
      values.push(value);
      counts.push(count);
    }
  });
});

reader.on('end', () => {
  const count = values.length;
  const sum = values.reduce((acc, val) => acc + val * counts[values.indexOf(val)], 0);
  process.stdout.write(`count=${count} sum=${sum}\n`);
});
