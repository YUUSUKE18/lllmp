import { Readable, ReadTextError } from 'stream';

const input = process.stdin;
const reader = input.createTextReader();

let validLineCount = 0;
let currentLine = '';

reader.on('data', (data) => {
    currentLine += data;
    const trimmedLine = currentLine.trim();

    if (trimmedLine) {
        const parts = trimmedLine.split(',');
        if (parts.length > 1) {
            validLineCount++;
        }
        currentLine = '';
    }
});

reader.on('end', () => {
    if (validLineCount > 0) {
        console.log(`valid=${validLineCount}`);
    }
});
