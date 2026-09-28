import { Map } from 'typescript';

const memo = new Map<number, number>();

function steps(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;

    const isEven = n % 2 === 0;
    let next = isEven ? n / 2 : 3 * n + 1;

    const stepsCount = 1 + steps(next);
    memo.set(n, stepsCount);
    return stepsCount;
}

function main() {
    let total = 0;
    const lines = process.stdin.read().split('\n');

    for (let line of lines) {
        const nStr = line.trim();
        if (!nStr || isNaN(nStr)) continue;

        const n = parseInt(nStr, 10);
        if (n < 1) continue;

        total += steps(n);
    }

    console.log(`total=${total}`);
}

main();
