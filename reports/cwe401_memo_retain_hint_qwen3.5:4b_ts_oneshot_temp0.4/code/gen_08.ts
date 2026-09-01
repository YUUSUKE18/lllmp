const memo = new Map<number, number>();
let total = 0;

function collatzStep(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;
    
    let steps = 0;
    while (true) {
        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        if (n < 0 || Number.isNaN(n)) break; // Safety check, though problem guarantees 64-bit fit
        steps++;
        if (n === 1) {
            memo.set(n, steps);
            return steps;
        }
    }
    
    // If loop detected or unexpected state (should not happen for valid inputs)
    // However, standard Collatz conjecture implies termination. 
    // We'll assume inputs are within safe bounds as per problem description.
    memo.set(n, steps);
    return steps;
}

process.stdin.on("data", (c: Buffer) => {
    const lines = c.toString("utf8").split("\n");
    
    for (const line of lines) {
        if (!line.trim()) continue; // Skip empty lines
        
        try {
            const n = parseInt(line, 10);
            if (Number.isNaN(n)) continue; // Skip invalid integers
            
            if (n < 0) continue; // Ensure non-negative
            
            const steps = collatzStep(n);
            total += steps;
        } catch (e) {
            // Ignore lines that cause parsing errors beyond parseInt
        }
    }
    
    process.stdin.on("end", () => {
        console.log(`total=${total}`);
    });
});

// Handle case where input might be empty initially but end event fires immediately
process.stdin.on("end", () => {
    console.log(`total=${total}`);
});
