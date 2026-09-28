import { Readable, ReadLines } from 'stream';

const input = Readable.from(process.stdin);
const lines = input.pipe(ReadLines({ terminal: false }));

let validLineCount = 0;

lines.forEach(line => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;

    const parts = trimmedLine.split(',');
    if (parts.length >= 2) {
        validLineCount++;
    }
});

console.log(`valid=${validLineCount}`);
