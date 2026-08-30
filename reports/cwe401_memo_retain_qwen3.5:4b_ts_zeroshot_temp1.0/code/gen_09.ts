import * as fs from "fs";

const memo = new Map<number, number>();

function stepCount(n: number): number {
    if (n === 1) return 0;
    
    let current = n;
    let steps = 0;
    
    while (current !== 1) {
        if (memo.has(current)) {
            const prevSteps = memo.get(current)!;
            const remaining = stepCountForValue(prevSteps, current); // This logic is flawed, need a recursive approach with cache lookup
            
            // Let's restart the logic properly using memoization correctly
            break; 
        }

        if (current % 2 === 0) {
            current = Math.floor(current / 2);
        } else {
            current = 3 * current + 1;
        }
        steps++;
    }
    
    return steps;
}

// Re-implementing stepCount with proper memoization
function getStepCount(n: number): number {
    if (memo.has(n)) {
        return memo.get(n)!;
    }
    
    if (n === 1) {
        memo.set(n, 0);
        return 0;
    }

    let nextN: number;
    if (n % 2 === 0) {
        nextN = n / 2;
    } else {
        nextN = 3 * n + 1;
    }

    const steps = 1 + getStepCount(nextN);
    memo.set(n, steps);
    return steps;
}

// Helper to calculate remaining steps from known result if we encounter a value in cache during recursion
function stepCountForValue(steps: number, n: number): number {
    // This helper is not actually needed if implemented correctly recursively above.
    // The previous attempt was flawed. Let's stick to the clean recursive version below.
}

// Final Clean Implementation Logic (Inline for single file)
function processInput(): void {
    const lines = fs.readFileSync(0, "utf-8").trim().split("\n");
    let totalSteps = 0;

    for (const line of lines) {
        if (line.trim() === "") continue;
        
        const n = parseInt(line.trim(), 10);
        if (isNaN(n)) continue;

        const steps = getStepCount(n);
        totalSteps += steps;
    }

    console.log(`total=${totalSteps}`);
}

processInput();
