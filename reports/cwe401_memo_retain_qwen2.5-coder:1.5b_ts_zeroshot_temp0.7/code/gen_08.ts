import { readFileSync } from 'fs';

function calculateSteps(n: number): number {
    if (n === 1) {
        return 0;
    }
    if (n % 2 === 0) {
        return 1 + calculateSteps(n / 2);
    } else {
        return 1 + calculateSteps(3 * n + 1);
    }
}

const input = readFileSync('input.txt', 'utf-8').trim().split('\n');
let totalSteps = 0;

for (const line of input) {
    const n = parseInt(line, 10);
    if (!isNaN(n)) {
        totalSteps += calculateSteps(n);
    }
}

console.log(`total=${totalSteps}`);
