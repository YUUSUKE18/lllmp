import { Readable, ReadText } from 'stream';

const input = Readable.from(process.stdin);

const memo = new Map<number, number>();

function steps(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n);

    let steps = 0;
    let current = n;

    while (current !== 1) {
        if (current % 2 === 0) {
            current = current / 2;
        } else {
            current = 3 * current + 1;
        }
        steps++;
    }

    memo.set(n, steps);
    return steps;
}

let total = 0;

for await (const line of input) {
    const nStr = line.trim();
    if (!nStr || isNaN(nStr)) continue;

    const n = parseInt(nStr, 10);
    if (n < 1) continue;

    total += steps(n);
}

console.log(`total=${total}`);
