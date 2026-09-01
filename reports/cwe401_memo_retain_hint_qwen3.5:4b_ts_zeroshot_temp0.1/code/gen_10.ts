const memo = new Map<number, number>();

function collatzStep(n: number): number {
    if (n === 1) return 0;
    
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
    
    return steps;
}

function solve(): void {
    const lines = process.stdin.read().split('\n');
    let totalSteps = 0;
    
    for (const line of lines) {
        if (!line.trim()) continue;
        
        const n = parseInt(line.trim(), 10);
        if (isNaN(n)) continue;
        
        if (n < 1) continue;
        
        let steps = 0;
        let current = n;
        
        while (current !== 1) {
            if (memo.has(current)) {
                steps += memo.get(current)!;
                break;
            }
            
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
        }
        
        totalSteps += steps;
    }
    
    console.log(`total=${totalSteps}`);
}

solve();
