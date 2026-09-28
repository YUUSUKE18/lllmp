import { Readable } from 'stream';

const reader = Readable.from(process.stdin);

let validLineCount = 0;
let currentLine = '';

reader.on('line', (line) => {
    line = line.trim();
    if (!line) return;

    if (/[^0-9,]/.test(line)) return;

    if (line.endsWith(',')) {
        line = line.slice(0, -1);
    }

    const parts = line.split(',');
    if (parts.length > 1) validLineCount++;
    currentLine = line;
});

reader.on('end', () => {
    if (validLineCount > 0) {
        console.log(`valid=${validLineCount}`);
    }
});
