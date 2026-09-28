import { Readable, ReadText } from 'stream';

const input = Readable.from(process.stdin);

const memo = new Map<number, number>();

function steps(n: number): number {
    if (n === 1) return 0;
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

let total = 0;
for await (const line of input) {
    const n = parseInt(line.trim());
    if (!isNaN(n) && n > 0) {
        total += steps(n);
    }
}

console.log(`total=${total}`);
