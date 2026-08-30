import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim().split('\n');

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

let totalSteps = 0;

for (const line of input) {
    if (!line.trim()) continue;
    
    const n = parseInt(line.trim(), 10);
    if (isNaN(n)) continue;
    
    if (n < 1) continue;
    
    // 既に計算済みの値がある場合はその値をそのまま加算
    if (memo.has(n)) {
        totalSteps += memo.get(n)!;
    } else {
        const steps = collatzStep(n);
        totalSteps += steps;
    }
}

console.log(`total=${totalSteps}`);
