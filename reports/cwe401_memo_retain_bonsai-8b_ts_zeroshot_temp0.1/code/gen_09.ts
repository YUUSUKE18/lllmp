import { Readable, ReadText } from 'stream';

const input = Readable.from(process.stdin);
const memo = new Map<number, number>();

function collate(n: number): number {
    if (n === 0) return 0;
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n);
    if (n % 2 === 0) {
        const next = n / 2;
        memo.set(n, 1 + collate(next));
    } else {
        const next = 3 * n + 1;
        memo.set(n, 1 + collate(next));
    }
    return memo.get(n) || 0;
}

let total = 0;
for await (const line of input) {
    const n = parseInt(line.trim());
    if (!isNaN(n)) {
        total += collate(n);
    }
}

console.log(`total=${total}`);
