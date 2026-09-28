import * as fs from 'fs';

const memo = new Map<number, number>();

function collatzStep(n: number): number {
    if (n === 1) return 0;
    const steps = memo.get(n);
    if (steps !== undefined) return steps;

    let nextN: number;
    if (n % 2 === 0) {
        nextN = n / 2;
    } else {
        nextN = 3 * n + 1;
    }

    const subSteps = collatzStep(nextN);
    memo.set(n, subSteps + 1);
    return subSteps + 1;
}

function main() {
    const input = fs.readFileSync(0, 'utf-8');
    const lines = input.split('\n');
    
    let total = 0;
    
    for (const line of lines) {
        if (!line.trim()) continue;
        
        const n = parseInt(line.trim(), 10);
        if (isNaN(n)) continue;
        
        if (n < 1) continue;
        
        total += collatzStep(n);
    }
    
    console.log(`total=${total}`);
}

main();
