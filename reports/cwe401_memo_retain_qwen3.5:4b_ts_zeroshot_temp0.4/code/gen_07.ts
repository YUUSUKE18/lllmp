import * as fs from 'fs';

const memo = new Map<number, number>();

function collatzStep(n: number): number {
    if (n === 1) return 0;
    const steps = memo.get(n);
    if (steps !== undefined) return steps;

    let nextN = n;
    let count = 0;
    
    while (nextN !== 1) {
        if (nextN % 2 === 0) {
            nextN = nextN / 2;
        } else {
            nextN = 3 * nextN + 1;
        }
        count++;
    }

    memo.set(n, count);
    return count;
}

function main() {
    const input = fs.readFileSync(0, 'utf-8');
    const lines = input.split('\n').filter(line => line.trim().length > 0);
    
    let totalSteps = 0;

    for (const line of lines) {
        const n = parseInt(line.trim());
        if (isNaN(n)) continue;
        
        // 1 以上の整数のみ処理
        if (n >= 1) {
            totalSteps += collatzStep(n);
        }
    }

    console.log(`total=${totalSteps}`);
}

main();
