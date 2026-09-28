const memo = new Map<number, number>();

function collatzStep(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;
    
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
    
    memo.set(n, steps);
    return steps;
}

function parseAndProcess() {
    const lines = process.stdin.read().split('\n');
    let totalSteps = 0;
    
    for (const line of lines) {
        if (!line.trim()) continue;
        
        const n = parseInt(line.trim(), 10);
        if (isNaN(n) || n < 1) continue;
        
        totalSteps += collatzStep(n);
    }
    
    console.log(`total=${totalSteps}`);
}

parseAndProcess();
