import { Readable } from 'stream';

const input = Readable.from(process.stdin);

input.on('line', (line) => {
  const trimmedLine = line.trim();
  const regex = /^([1-9]\d*)\s*(?:,[1-9]\d*)*\s*$/;
  const match = trimmedLine.match(regex);
  
  if (match && match.length > 1) {
    console.log(`valid=${match.length}`);
  }
});

input.on('end', () => {
  // Last line might be valid, but we don't need to check it as it's already handled
});
