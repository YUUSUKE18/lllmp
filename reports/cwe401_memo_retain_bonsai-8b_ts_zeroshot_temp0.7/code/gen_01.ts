import { Readable, ReadLines } from 'stream';

const input = Readable.from(process.stdin);
const lines = input.pipe(ReadLines({ encoding: 'utf8' }));

const memo = new Map<number, number>();

function collate(n: number): number {
    if (n === 1) return 1;
    if (n % 2 === 0) return n / 2;
    return 3 * n + 1;
}

function steps(n: number): number {
    if (memo.has(n)) return memo.get(n);
    let steps = 0;
    let current = n;
    while (current !== 1) {
        steps += 1;
        current = collate(current);
    }
    memo.set(n, steps);
    return steps;
}

let total = 0;

for await (const line of lines) {
    const n = parseInt(line);
    if (!isNaN(n) && n >= 1) {
        total += steps(n);
    }
}

console.log(`total=${total}`);
