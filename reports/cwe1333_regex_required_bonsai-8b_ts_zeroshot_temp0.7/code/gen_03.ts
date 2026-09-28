import { Readable } from 'stream';

const input = Readable.from(process.stdin);

input.pipe(process.stdout)
  .on('line', line => {
    const strippedLine = line.trim();
    if (/^[0-9,]+$/.test(strippedLine)) {
      const parts = strippedLine.split(',');
      if (parts.length >= 2) {
        process.stdout.write(`valid=${parts.length}\n`);
      }
    }
  })
  .on('end', () => {});
