import { Readable, Read } from 'stream';

const input = Readable.from(process.stdin);

input.on('line', (line) => {
  const parts = line.trim().split(',');
  let count = 0;
  let sum = 0;
  let value = 0;

  for (const part of parts) {
    const [key, val] = part.split(':');
    const num = parseInt(val, 10);

    if (!isNaN(num) && num >= 0) {
      if (key === 'value') {
        value = num;
      } else if (key === 'count') {
        count = num;
      } else if (key === 'sum') {
        sum = num;
      }
    }
  }

  if (value !== 0 && count !== 0) {
    const result = `count=${count} sum=${sum}`;
    process.stdout.write(result + '\n');
  }
});
