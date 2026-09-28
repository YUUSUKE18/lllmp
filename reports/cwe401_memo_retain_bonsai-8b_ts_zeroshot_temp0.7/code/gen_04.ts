import { Readable, ReadLines } from 'stream';

const reader = Readable.from(process.stdin);
const lines = readLines(reader);

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

for (const line of lines) {
    const num = parseInt(line.trim());
    if (!isNaN(num)) {
        total += steps(num);
    }
}

console.log(`total=${total}`);
