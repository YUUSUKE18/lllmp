const memo = new Map<number, number>();

function collatzStep(n: number): number {
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

function solve(): void {
    const lines = process.stdin.read().split('\n');
    let totalSteps = 0;
    
    for (const line of lines) {
        if (!line.trim()) continue;
        
        try {
            const n = parseInt(line.trim());
            if (isNaN(n)) continue;
            
            const steps = collatzStep(n);
            totalSteps += steps;
        } catch (e) {
            // 誤った形式は無視
        }
    }
    
    console.log(`total=${totalSteps}`);
}

solve();
