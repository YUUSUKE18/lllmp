import { Readable, ReadText } from 'stream';

const input = Readable.from(process.stdin);

const memo = new Map<number, number>();

function collate(n: number): number {
    return Number.isInteger(n) ? n : null;
}

function steps(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n);
    const next = n % 2 === 0 ? n / 2 : 3 * n + 1;
    const steps = 1 + steps(next);
    memo.set(n, steps);
    return steps;
}

const total = 0;
for await (const line of input) {
    const n = collate(line);
    if (n !== null) {
        total += steps(n);
    }
}

console.log(`total=${total}`);
