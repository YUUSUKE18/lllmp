import { Readable } from 'stream';

const input = process.stdin.readable();
const lines = [];

input.on('line', (line) => {
  const trimmedLine = line.trim();
  if (trimmedLine.length === 0) return;
  if (/[^0-9,]/.test(trimmedLine)) return;
  lines.push(trimmedLine);
});

input.on('end', () => {
  const validLines = lines.filter(line => {
    const parts = line.split(',');
    return parts.length >= 1;
  });

  const validCount = validLines.length;
  process.stdout.write(`valid=${validCount}\n`);
});
