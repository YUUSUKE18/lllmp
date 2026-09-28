import { Readable } from 'stream';

const input = process.stdin.readable();
const lines = [];

input.on('line', (line) => {
    const strippedLine = line.trim();
    if (strippedLine && /^\d+,\d+$/.test(strippedLine)) {
        lines.push(strippedLine);
    }
});

input.on('end', () => {
    const validCount = lines.length;
    console.log(`valid=${validCount}`);
});
