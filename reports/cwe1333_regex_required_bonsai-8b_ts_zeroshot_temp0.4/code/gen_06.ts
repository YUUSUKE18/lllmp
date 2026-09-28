import { Readable } from 'stream';

const input = Readable.from(process.stdin);

input.on('line', line => {
    const trimmedLine = line.trim();
    const match = trimmedLine.match(/^(\d+)(?:,\d+)*$/);
    if (match && match[1] !== '') {
        console.log(`valid=${trimmedLine.split(',').length}`);
    }
});

input.on('end', () => {
    console.log(`valid=${trimmedLine.split(',').length}`);
});
