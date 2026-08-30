import { ReadLine } from 'readline';

const rl = new ReadLine({ input: process.stdin });

const memo = new Map<number, number>();

function collatzStep(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;

    let steps = 0;
    while (n !== 1) {
        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        steps++;
    }

    memo.set(n, steps);
    return steps;
}

function solve() {
    const total = BigInt(0);
    let line: string | undefined;

    while ((line = rl.nextLine()) !== undefined) {
        if (line.trim() === '') continue;

        const n = parseInt(line.trim(), 10);
        if (isNaN(n)) continue;

        if (n < 1) continue;

        const steps = collatzStep(n);
        total += BigInt(steps);
    }

    console.log(`total=${Number(total)}`);
}

solve();
