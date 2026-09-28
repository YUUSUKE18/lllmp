import { Readable } from 'stream';

const reader = Readable.from(process.stdin);

let validLines = 0;
let currentLine = '';

reader
  .pipe(reader.line())
  .pipe(reader.trim())
  .on('line', (line) => {
    if (/^\d+,\d+$/.test(line)) {
      validLines++;
      currentLine = line;
    } else if (line && !/^\d+,\d+$/.test(line)) {
      // If line is not empty and not a valid line, it's invalid
      validLines--;
      currentLine = '';
    } else if (line && currentLine && !/^\d+,\d+$/.test(currentLine)) {
      // If line is empty and previous line was valid, it's invalid
      validLines--;
      currentLine = '';
    }
  })
  .on('end', () => {
    if (validLines >= 1) {
      process.stdout.write(`valid=${validLines}\n`);
    } else {
      process.stdout.write('valid=0\n');
    }
  });
