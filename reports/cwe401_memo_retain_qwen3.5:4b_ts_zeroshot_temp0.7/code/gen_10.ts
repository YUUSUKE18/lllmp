const memo = new Map<number, number>();

function calculateSteps(n: number): number {
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
    const totalSteps = 0;
    
    process.stdin.on('data', (chunk) => {
        const lines = chunk.toString().split('\n');
        
        for (const line of lines) {
            const trimmed = line.trim();
            
            if (!trimmed || !/^-?\d+$/.test(trimmed)) continue;
            
            const n = parseInt(trimmed, 10);
            if (isNaN(n)) continue;
            
            const steps = calculateSteps(n);
            totalSteps += steps;
        }
    });
    
    process.stdin.on('end', () => {
        console.log(`total=${totalSteps}`);
    });
}

main();
