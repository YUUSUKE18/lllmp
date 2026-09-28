import { Readable } from 'stream';

const input = Readable.from(process.stdin);

input.on('line', line => {
  const trimmedLine = line.trim();
  const regex = /^(\d+)(?:,\d+)*$/;
  const match = trimmedLine.match(regex);
  
  if (match && match[1] && match[1].length > 0) {
    const count = match[1].split(',').length;
    if (count >= 2) {
      process.stdout.write(`valid=${count}\n`);
    }
  }
});

input.on('close', () => {
  process.stdout.flush();
});
