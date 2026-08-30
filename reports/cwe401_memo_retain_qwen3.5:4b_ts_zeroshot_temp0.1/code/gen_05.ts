import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').split('\n');

const memo: Map<number, number> = new Map();

function collatzStep(n: number): number {
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

let total = 0;

for (const line of input) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    const n = parseInt(trimmed, 10);
    if (isNaN(n)) continue;
    
    if (n < 1) continue;
    
    total += collatzStep(n);
}

console.log(`total=${total}`);
