import { Readable, ReadTextError } from 'stream';

const input = process.stdin;
const reader = input.pipe(Readable.fromText);

const memo = new Map<string, number>();

function steps(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n.toString())) return memo.get(n.toString())!;
    let count = 0;
    let current = n;
    while (current !== 1) {
        count++;
        if (current % 2 === 0) current = current / 2;
        else current = 3 * current + 1;
    }
    memo.set(n.toString(), count);
    return count;
}

function main(): void {
    let total = 0;
    let line;
    while ((line = reader.readLine()) !== undefined) {
        const nStr = line.trim();
        if (!nStr || isNaN(nStr)) continue;
        const n = parseInt(nStr, 10);
        if (n < 1) continue;
        total += steps(n);
    }
    console.log(`total=${total}`);
}

main();
