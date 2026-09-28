import { Readable, Read } from 'stream';

const input = Readable.from(process.stdin);

input.on('line', line => {
  line = line.trim();
  if (/^\d+(\d,?\d+)*$/.test(line)) {
    const validLines = Array.from(input).filter(line => {
      line = line.trim();
      return (/^\d+(\d,?\d+)*$/.test(line) && line !== '');
    }).filter(line => line !== '');
    if (validLines.length >= 1) {
      console.log(`valid=${validLines.length}`);
    }
  }
});
