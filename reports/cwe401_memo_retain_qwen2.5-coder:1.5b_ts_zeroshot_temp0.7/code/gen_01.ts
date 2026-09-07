import { readFileSync } from 'fs';

function solve(n: number, memo: Map<number, number>): number {
    if (memo.has(n)) return memo.get(n)!;
    if (n === 1) return 0;
    memo.set(n, 1 + (n % 2 === 0 ? solve(n / 2, memo) : solve(3 * n + 1, memo)));
    return memo.get(n)!;
}

const input = readFileSync('/dev/stdin', 'utf8').split('\n').filter(Boolean).map(Number);
const memo: Map<number, number> = new Map();
let total = 0;

for (const n of input) {
    total += solve(n, memo);
}

console.log(`total=${total}`);
