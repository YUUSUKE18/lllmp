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

    const n = parseInt(lines[0], 10);
    if (isNaN(n)) {
        // 最初の行が整数でない場合は何もしない（仕様上は最初の行がクエリと仮定）
        console.log("total=0");
        return;
    }

    // Memoization for the sequence calculation
    const memo = new Map<number, number>();

    /**
     * Calculates the number of steps to reach 1 from n using the Collatz sequence rules.
     * @param n The starting number.
     * @returns The number of steps.
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 0;
        let current = n;
        const path = new Set<number>(); // To detect cycles, though Collatz is conjectured to terminate

        while (current !== 1) {
            if (path.has(current)) {
                // Cycle detected, for safety in this context, treat as potentially infinite or error, 
                // though Collatz conjecture suggests this won't happen for standard inputs.
                // For this problem, we assume termination.
                break; 
            }
            path.add(current);

            if (current % 2 === 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // If the loop terminated because current != 1 (cycle detected, which shouldn't happen), 
        // we might need to handle it, but based on the problem, we expect termination at 1.
        if (current !== 1) {
            // This branch implies an issue or a non-terminating sequence for the given input structure.
            // We stick to the calculated steps if we exited the loop.
            // Since we are only asked for the total steps to 1, we return the steps taken towards 1.
            // For competitive programming contexts, if a number enters a cycle not involving 1, 
            // it usually implies an error state or a very long path.
            // Since we must return a finite number, we rely on the conjecture.
        }
        
        // Memoize the result for the original n
        memo.set(n, steps);
        return steps;
    }

    let totalSteps = 0;

    // Process all subsequent lines as queries
    for (let i = 1; i < lines.length; i++) {
        const queryN = parseInt(lines[i], 10);
        if (!isNaN(queryN)) {
            const steps = countSteps(queryN);
            totalSteps += steps;
        }
    }

    console.log(`total=${totalSteps}`);
}

solve();
