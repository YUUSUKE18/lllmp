const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (input === "") {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    if (lines.length === 0) {
        console.log("total=0");
        return;
    }

    let totalCount = 0;
    const memo = new Map<number, number>();

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n) || n < 1) continue;

        if (n === 1) {
            // Base case: n=1 takes 0 steps
            const count = 0;
            totalCount += count;
            memo.set(n, count);
            continue;
        }

        // Memoization check
        if (memo.has(n)) {
            totalCount += memo.get(n)!;
            continue;
        }

        // Recursive step
        let steps = 0;
        let currentN = n;
        const path = new Set<number>();

        while (currentN !== 1) {
            if (path.has(currentN)) {
                // Cycle detected, though for this problem (Collatz conjecture), 
                // we expect convergence to 1. If we hit a cycle other than 1, 
                // the assumption of reaching 1 might be violated, but we must stop.
                // For the Collatz problem, it is assumed to reach 1.
                break; 
            }
            path.add(currentN);
            
            if (currentN % 2 === 0) {
                currentN = currentN / 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            steps++;
        }

        if (currentN === 1) {
            // If we reached 1, calculate the total steps and memoize
            // We need to recalculate the actual steps for this path, or structure the memoization differently.
            // Since we are calculating the path from the start 'n', we need to track the steps taken.
            
            // Let's restart the calculation to correctly count steps for memoization, 
            // since the loop structure above only checks for cycles, not the depth.
            
            let tempN = n;
            let currentSteps = 0;
            const history = new Map<number, number>(); // Stores number -> steps from n
            history.set(n, 0);

            while (tempN !== 1) {
                if (tempN % 2 === 0) {
                    tempN = tempN / 2;
                } else {
                    tempN = 3 * tempN + 1;
                }
                currentSteps++;
                
                if (history.has(tempN)) {
                    // Cycle detected, treat as unreachable or handle error if needed, 
                    // but for Collatz, we assume it reaches 1.
                    break;
                }
                history.set(tempN, currentSteps);
            }

            if (tempN === 1) {
                const finalSteps = history.get(1) ?? -1; // Steps to reach 1
                if (finalSteps !== -1) {
                    totalCount += finalSteps;
                    memo.set(n, finalSteps);
                }
            }
        }
    }

    console.log(`total=${totalCount}`);
}

solve();
