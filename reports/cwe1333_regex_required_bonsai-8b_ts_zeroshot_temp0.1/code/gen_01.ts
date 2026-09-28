import { Readable } from 'stream';

const input = Readable.from(process.stdin);

input.on('line', line => {
  const trimmedLine = line.trim();
  const regex = /^(\d+)(?:,\d+)*$/;
  const matches = trimmedLine.match(regex);
  
  if (matches && matches.length > 1) {
    console.log(`valid=${matches.length}`);
  }
});

input.on('end', () => {
  console.log(`valid=${matches ? matches.length : 0}`);
});
