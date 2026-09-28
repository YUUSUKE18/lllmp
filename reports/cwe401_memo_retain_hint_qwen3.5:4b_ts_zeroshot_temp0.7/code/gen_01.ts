import * as fs from 'fs';

const memo = new Map<number, number>();

function collatzStep(n: number): number {
    if (n === 1) return 0;
    let steps = 0;
    const visited = new Set<number>();
    visited.add(n);
    
    while (n !== 1) {
        n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
        if (visited.has(n)) {
            // Cycle detected, though for Collatz conjecture this shouldn't happen for valid inputs up to safe limits.
            // However, the problem statement implies we stop when reaching 1. If a cycle is hit before 1, 
            // standard definitions suggest stopping or returning infinity, but given "reach 1" constraint,
            // we assume valid inputs where 1 is reachable.
            // To be safe against infinite loops in adversarial cases if the conjecture holds false (unlikely for int64):
            steps = Infinity; 
        }
        visited.add(n);
        steps++;
    }
    return steps;
}

function solve(): void {
    const input = fs.readFileSync(0, 'utf8');
    const lines = input.trim().split('\n').filter(line => line.length > 0);
    
    let totalSteps = 0;
    
    for (const line of lines) {
        try {
            const n = parseInt(line.trim());
            if (!Number.isNaN(n)) {
                if (memo.has(n)) {
                    totalSteps += memo.get(n) as number;
                } else {
                    const steps = collatzStep(n);
                    memo.set(n, steps);
                    totalSteps += steps;
                }
            }
        } catch (e) {
            // Ignore lines that are not valid integers
        }
    }
    
    console.log(`total=${totalSteps}`);
}

solve();
