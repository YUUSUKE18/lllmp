import { Readable, ReadLines } from 'stream';

const input = Readable.from(process.stdin);
const reader = ReadLines.from(input);

let numbers: number[] = [];

reader.on('line', line => {
    line = line.trim();
    if (line === '') return;
    const parts = line.split(',');
    parts.forEach(part => {
        const numStr = part.trim();
        if (/^-?\d+$/.test(numStr)) {
            numbers.push(+numStr);
        }
    });
});

const uniqueNumbers = [...new Set(numbers)];
const count = uniqueNumbers.length;
const sum = uniqueNumbers.reduce((acc, num) => acc + num, 0);

console.log(`count=${count} sum=${sum}`);
