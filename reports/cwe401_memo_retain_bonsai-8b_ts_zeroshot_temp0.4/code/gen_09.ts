import { Readable, ReadableStream } from 'stream';

const input = ReadableStream.from(process.stdin);
const memo = new Map<number, number>();

function steps(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n);
    const next = n % 2 === 0 ? n / 2 : 3 * n + 1;
    const stepsNext = steps(next);
    const stepsTotal = stepsNext + 1;
    memo.set(n, stepsTotal);
    return stepsTotal;
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
