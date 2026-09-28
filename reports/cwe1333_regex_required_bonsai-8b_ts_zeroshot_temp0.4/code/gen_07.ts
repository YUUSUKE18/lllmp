import { Readable, ReadText } from 'stream';

const validLineRegex = /^(?:\s*)((?:\d+)(?:,\d+)*)\s*$/;

const input = Readable.from(process.stdin);
const output = Readable.createTextStream();

input.pipe(output);

let validCount = 0;

input.on('line', (line) => {
  const trimmedLine = line.trim();
  if (validLineRegex.test(trimmedLine)) {
    validCount++;
  }
});

input.on('end', () => {
  output.write(`valid=${validCount}\n`);
});
