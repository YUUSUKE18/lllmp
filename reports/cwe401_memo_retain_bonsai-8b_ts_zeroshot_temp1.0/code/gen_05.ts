import { Readable, ReadableStream } from 'stream';

const memo = new Map<number, number>();

function collate(n: number): number {
    if (n < 1) return 0;
    if (memo.has(n)) return memo.get(n);
    let count = 0;
    let current = n;
    while (current !== 1) {
        count++;
        if (current % 2 === 0) {
            current = current / 2;
        } else {
            current = 3 * current + 1;
        }
    }
    memo.set(n, count);
    return count;
}

const input = ReadableStream.from(process.stdin);

input.on('line', (line) => {
    const num = parseInt(line, 10);
    if (isNaN(num) || num < 1) return;
    const steps = collate(num);
    const total = (total || 0) + steps;
    process.stdout.write(`total=${total}\n`);
});

input.on('end', () => {
    process.stdout.flush();
});
