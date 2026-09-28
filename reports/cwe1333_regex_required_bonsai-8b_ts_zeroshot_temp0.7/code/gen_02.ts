import { Readable } from 'stream';

const reader = Readable.from(process.stdin);

let validLineCount = 0;

reader.on('line', (line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.length === 0) return;

    const regex = /^(\d+)(?:,\d+)*$/;

    if (regex.test(trimmedLine)) {
        validLineCount++;
    }
});

reader.on('close', () => {
    console.log(`valid=${validLineCount}`);
});
