import { Readable } from 'stream';

const reader = Readable.from(process.stdin);

reader.on('line', (line) => {
  line = line.trim();
  if (/^\d+,\d+$/.test(line)) {
    const [a, b] = line.split(',');
    const valid = a && b;
    if (valid) {
      console.log(`valid=${valid ? '1' : '0'}`);
    }
  }
});
