import { Readable } from 'stream';

const input = Readable.from(process.stdin);

input
  .pipe(process.stdout)
  .on('line', line => {
    const elements = line
      .split(',')
      .map(e => e.trim())
      .filter(e => !e.length && !isNaN(parseInt(e, 10)));

    const count = elements.length;
    const max = elements.reduce((a, b) => parseInt(b, 10) > parseInt(a, 10) ? parseInt(b, 10) : a, -Infinity);

    console.log(`count=${count} max=${max}`);
  })
  .on('end', () => {
    console.log(`count=${count} max=${max}`);
  });
