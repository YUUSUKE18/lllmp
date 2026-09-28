import { Readable, ReadText } from 'stream';

const input = Readable.from(process.stdin);

input.on('line', line => {
  const trimmedLine = line.trim();
  if (!trimmedLine) return;

  const match = trimmedLine.match(/^(\d+)(?:,\d+)*$/);
  if (match && match[1] && match[2]) {
    const validLines = [];
    const parts = trimmedLine.split(',');
    for (const part of parts) {
      if (part.trim() && !isNaN(part)) {
        validLines.push(part);
      }
    }
    if (validLines.length > 1) {
      process.stdout.write(`valid=${validLines.length}\n`);
    }
  }
});

input.on('end', () => {
  process.stdout.flush();
});
