import { Readable } from 'stream';

const input = Readable.from(process.stdin);

input.on('line', line => {
  const trimmedLine = line.trim();
  const regex = /^(\d+)(?:,\d+)*$/;
  const match = trimmedLine.match(regex);
  
  if (match && match[1] !== '') {
    const count = match[1].split(',').length;
    if (count > 1) {
      process.stdout.write(`valid=${count}\n`);
    }
  }
});
