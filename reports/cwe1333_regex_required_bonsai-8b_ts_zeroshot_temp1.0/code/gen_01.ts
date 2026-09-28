import { Readable, ReadLines } from 'readline';

interface Line {
  value: string;
}

const reader = Readable.from(process.stdin);

let validLines = 0;

reader.on('line', (line) => {
  const trimmedLine = line.trim();

  if (/^[0-9,]+$/.test(trimmedLine) && trimmedLine.length > 0) {
    const parts = trimmedLine.split(',').filter(Boolean);
    if (parts.length > 0) {
      validLines++;
    }
  }
});

reader.on('close', () => {
  console.log(`valid=${validLines}`);
});
