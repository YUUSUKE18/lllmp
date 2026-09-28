import { Readable, ReadTextEvent } from 'stream';

const input = Readable.from(process.stdin);

const memo = new Map<number, number>();

async function countSteps(n: number): number {
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

async function main() {
    let total = 0;
    let line;

    while ((line = await input.readText()) !== '' && line.trim() !== '') {
        const numbers = line.trim().split(/\s+/);
        for (const numStr of numbers) {
            const num = parseInt(numStr, 10);
            if (!isNaN(num)) {
                total += await countSteps(num);
            }
        }
    }

    console.log(`total=${total}`);
}

main();
