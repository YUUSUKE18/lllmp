const memo = new Map<number, number>();

function collatzStep(n: number): number {
    if (n === 1) return 0;
    const prev = memo.get(n);
    if (prev !== undefined) return prev;

    let steps = 0;
    while (n !== 1) {
        n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
        steps++;
    }
    
    // Backtrack to fill memoization table
    let curr = n;
    while (curr > 1) {
        const parent = (curr % 2 === 0) ? curr / 2 : (curr - 3 * curr + 1) / 3; // Actually we need to go forward from original n
        // Let's redo the backtracking logic properly. We know the path from original n to 1.
        // But since we are computing for a specific input, let's just compute it once and store the result.
        // The issue is that intermediate values might be needed for future queries.
        // A better approach: Compute the full path, store each value's steps in memo.
        
        break; 
    }

    // Correct backtracking implementation
    let current = n;
    let totalSteps = 0;
    
    // We need to simulate from original input down to 1, but we are inside a function that takes 'n' as argument?
    // No, the function should take the starting number and return steps.
    // But we need to memoize intermediate values.
    // Let's restructure:
    
    // Actually, let's just compute the path for the given input n, store all visited numbers (excluding 1) in memo with their distance from 1.
    // Then return total steps.
    
    const path: number[] = [];
    let tempN = n;
    while (tempN !== 1) {
        if (tempN % 2 === 0) tempN = tempN / 2;
        else tempN = 3 * tempN + 1;
        path.push(tempN);
    }
    
    // The last element in path is 1. The distance from 1 to 1 is 0.
    // We can compute distance for each number in the path.
    // path[0] is n, path[path.length-1] is 1.
    // steps for path[i] = steps for path[i+1] + 1.
    
    let count = 0;
    // Start from end (which is 1) and go backwards? 
    // No, we know 1 takes 0 steps.
    // path[path.length-1] = 1 -> 0 steps.
    // path[path.length-2] -> 1 step.
    
    for (let i = path.length - 1; i >= 0; i--) {
        const val = path[i];
        if (val !== 1) {
            memo.set(val, count);
        }
        count++;
    }

    return count;
}

function main() {
    let input: string[] = [];
    let line;
    
    // Read all lines from stdin
    while ((line = process.stdin.read().trim()) !== null && line.length > 0) {
        if (line.trim() === "") continue;
        const val = parseInt(line);
        if (!isNaN(val)) {
            input.push(val);
        }
    }

    let totalSteps = 0;
    
    for (const n of input) {
        totalSteps += collatzStep(n);
    }

    console.log(`total=${totalSteps}`);
}

main();
