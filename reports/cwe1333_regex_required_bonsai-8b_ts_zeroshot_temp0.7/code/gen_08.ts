import { Readable, ReadLines } from 'stream';

const input = Readable.from(process.stdin);
const lines = input.pipe(ReadLines);

const validLinePattern = /^(\d+)(?:,\d+)*$/;

lines.on('line', line => {
    const trimmedLine = line.trim();
    if (trimmedLine && validLinePattern.test(trimmedLine)) {
        console.log(`valid=${trimmedLine.split(',').length}`);
    }
});
