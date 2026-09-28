import { Readable, ReadLines } from 'readline';

const reader = Readable.create();
const lines = [];

reader.on('line', (line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.length === 0) return;

    const regex = /^(\d+)(?:,(\d+))*$/;
    const match = trimmedLine.match(regex);

    if (match && match[1] && match[2] && match[3] || match[1]) {
        lines.push(trimmedLine);
    }
});

reader.on('close', () => {
    const validLines = lines.filter(line => {
        const regex = /^(\d+)(?:,(\d+))*$/;
        return regex.test(line);
    });

    const validCount = validLines.length;
    process.stdout.write(`valid=${validCount}\n`);
});
