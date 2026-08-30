const memo: Map<number, number> = new Map();

function getSteps(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;
    
    let steps = 0;
    while (n !== 1) {
        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        steps++;
    }
    
    memo.set(n, steps);
    return steps;
}

function main() {
    const lines = process.stdin.read().split('\n');
    let totalSteps = 0;
    
    for (const line of lines) {
        if (!line.trim()) continue;
        
        const n = parseInt(line.trim(), 10);
        if (isNaN(n)) continue;
        
        const steps = getSteps(n);
        totalSteps += steps;
    }
    
    console.log(`total=${totalSteps}`);
}

main();
