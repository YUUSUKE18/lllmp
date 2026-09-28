import { Readable } from 'stream';

const input = Readable.from(process.stdin);

input.on('line', line => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;

    const regex = /^(\d+)(?:,\d+)*$/;
    if (regex.test(trimmedLine)) {
        const parts = trimmedLine.split(',');
        const validCount = parts.length;
        if (validCount >= 1) {
            process.stdout.write(`valid=${validCount}\n`);
        }
    }
});

input.on('close', () => {
    process.stdout.flush();
});
