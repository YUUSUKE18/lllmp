const memo = new Map<number, number>();

function calculateSteps(n: number): number {
    if (n === 1) return 0;
    
    let steps = 0;
    let current = n;
    
    while (current !== 1) {
        if (memo.has(current)) {
            steps += memo.get(current)!;
            break;
        }
        
        if (current % 2 === 0) {
            current = Math.floor(current / 2);
        } else {
            current = 3 * current + 1;
        }
    }
    
    // Backtrack to fill memoization table
    let temp = n;
    while (temp !== 1) {
        if (memo.has(temp)) {
            const subSteps = calculateSteps(memo.get(temp)!);
            memo.set(temp, subSteps + 1);
            temp = Math.floor(temp / 2); // Move back to parent in the sequence
        } else {
            break;
        }
    }
    
    return steps;
}

function processInput() {
    const lines = process.stdin.read().split('\n');
    let totalSteps = 0;
    
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        
        const n = parseInt(trimmed, 10);
        if (isNaN(n)) continue;
        
        // Ensure n is positive integer as per spec "1 以上の整数"
        if (n < 1) continue;
        
        totalSteps += calculateSteps(n);
    }
    
    console.log(`total=${totalSteps}`);
}

processInput();
