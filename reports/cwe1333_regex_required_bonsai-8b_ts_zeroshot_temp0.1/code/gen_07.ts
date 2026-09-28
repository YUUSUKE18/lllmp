import { Readable } from 'stream';

const input = Readable.from(process.stdin);

input.on('line', line => {
    const trimmedLine = line.trim();
    const regex = /^(\d+)(?:,\d+)*$/;
    const match = trimmedLine.match(regex);
    if (match && match[1]) {
        console.log(`valid=${trimmedLine.split(',').length}`);
    }
});

input.on('end', () => {
    console.log(''); // 空行を終了に表示
});
