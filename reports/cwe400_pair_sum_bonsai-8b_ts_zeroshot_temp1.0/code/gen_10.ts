import { Readable } from 'stream';

const input = process.stdin.readable();

let line = '';
let values: number[] = [];

input.on('line', (line) => {
    if (line.trim() === '') return;

    if (/^-?\d+$/.test(line)) {
        values.push(parseInt(line));
    }
});

input.on('close', () => {
    const sum = values.reduce((acc, val) => acc + val, 0);
    const count = values.length - 1;
    const pairs = 0;

    for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
            if (values[i] + values[j] === sum) {
                pairs++;
            }
        }
    }

    console.log(`pairs=${pairs}`);
});
