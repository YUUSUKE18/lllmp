import { Readable, ReadTextError } from 'stream';

const numbers = new Set<number>();
let total = 0;

function countSteps(n: number): number {
    if (n === 1) return 0;
    if (numbers.has(n)) return numbers.get(n)!;

    numbers.add(n);
    let steps = 0;

    let current = n;
    while (current !== 1) {
        if (current % 2 === 0) {
            current /= 2;
        } else {
            current = 3 * current + 1;
        }
        steps++;
    }

    return steps;
}

function processInput(input: string): void {
    try {
        const lines = input.split('\n');
        for (const line of lines) {
            const numStr = line.trim();
            if (!numStr || isNaN(parseInt(numStr))) continue;

            const num = parseInt(numStr, 10);
            if (num < 1) continue;

            const steps = countSteps(num);
            total += steps;
        }
    } catch (error) {
        console.error('Error reading input:', error);
    }
}

const stdin = process.stdin;

stdin.on('data', processInput);
