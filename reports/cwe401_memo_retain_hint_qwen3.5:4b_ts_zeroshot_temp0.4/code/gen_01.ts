import { ReadLine } from 'readline';

const rl = new ReadLine();

const memo: Map<number, number> = new Map();

function collatzStep(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;

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

function parseLine(line: string): number | null {
    const trimmed = line.trim();
    if (trimmed === '') return null;
    const parsed = parseInt(trimmed, 10);
    if (isNaN(parsed)) return null;
    return parsed;
}

let totalSteps = 0;

rl.on('line', (line) => {
    const n = parseLine(line);
    if (n !== null) {
        totalSteps += collatzStep(n);
    }
});

rl.on('close', () => {
    console.log(`total=${totalSteps}`);
});
