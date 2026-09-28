import { Readable } from 'stream';

const input = process.stdin.readable();

let target = 0;
let numbers = [];

input.on('line', line => {
    if (!line.trim()) return;

    const parts = line.split(/\s+/);
    if (parts.length === 0) return;

    const firstPart = parts[0];
    if (/^-?\d+$/.test(firstPart)) {
        target = parseInt(firstPart, 10);
    } else {
        const number = parts[1];
        if (/^-?\d+$/.test(number)) {
            numbers.push(parseInt(number, 10));
        }
    }
});

input.on('end', () => {
    let count = 0;
    const seen = new Set<number>();
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[i] + numbers[j] === target && seen.has(numbers[i]) && seen.has(numbers[j])) {
                count++;
                seen.add(numbers[i]);
                seen.add(numbers[j]);
            }
        }
    }

    console.log(`pairs=${count}`);
});
