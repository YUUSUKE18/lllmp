import { readFileSync } from 'fs';

const cache = new Map<number, number>();

function collatzSteps(n: number): number {
    if (n === 1) return 0;
    
    // メモ化された値がある場合、それを使う
    if (cache.has(n)) return cache.get(n)!;
    
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
    
    cache.set(n, steps);
    return steps;
}

function main() {
    const input = readFileSync(0, 'utf-8');
    const lines = input.trim().split('\n').filter(line => line.trim() !== '');
    
    let total = 0;
    
    for (const line of lines) {
        const n = parseInt(line.trim(), 10);
        if (!isNaN(n)) {
            total += collatzSteps(n);
        }
    }
    
    console.log(`total=${total}`);
}

main();
