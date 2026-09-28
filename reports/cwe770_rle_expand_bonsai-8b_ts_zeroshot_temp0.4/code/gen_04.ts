import { Readable } from 'stream';

const input = process.stdin.readable();
const result = process.stdout.writeable();

input.pipe(input.buffer)
  .on('data', text => {
    const parts = text
      .split(',')
      .map(part => {
        const [value, count] = part.trim().split(':');
        if (!value || !count) return '';
        const num = parseInt(value, 10);
        const numCount = parseInt(count, 10);
        if (isNaN(num) || isNaN(numCount) || numCount < 0) return '';
        return num.toString(numCount);
      })
      .filter(Boolean)
      .map(item => item.split(',').map(x => x.trim()));

    const flattened = result
      .pipe(result.buffer)
      .on('write', () => {});

    const count = flattened.length;
    const sum = flattened
      .reduce((acc, item) => {
        const num = parseInt(item, 10);
        if (isNaN(num)) return acc;
        return acc + num;
      }, 0);

    result.write(`count=${count} sum=${sum}\n`);
  })
  .on('end', () => {
    result.end();
  });
