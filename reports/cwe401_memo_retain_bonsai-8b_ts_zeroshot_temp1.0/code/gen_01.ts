import { Readable, ReadText } from 'stream';

const reader = Readable.from(process.stdin);

const memo = new Map<number, number>();

function collateNumbers(input: string): number[] {
    const result: number[] = [];
    const lines = input.trim().split('\n');
    for (const line of lines) {
        const numStr = line.trim();
        if (/^-?\d+$/.test(numStr)) {
            const num = parseInt(numStr, 10);
            if (num >= 0 && num <= 2147483647) {
                result.push(num);
            }
        }
    }
    return result;
}

function steps(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;

    let steps = 0;
    let current = n;

    while (current !== 1) {
        steps++;
        if (current % 2 === 0) {
            current /= 2;
        } else {
            current = 3 * current + 1;
        }
    }

    memo.set(current, steps);
    return steps;
}

const numbers = collateNumbers(reader);

let total = 0;
for (const num of numbers) {
    total += steps(num);
}

console.log(`total=${total}`);
