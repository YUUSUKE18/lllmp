const memo = new Map<number, number>();

function getCollatzStep(n: number): number {
    if (n === 1) return 0;
    const cached = memo.get(n);
    if (cached !== undefined) return cached;

    let current: number = n;
    let steps: number = 0;

    while (true) {
        if (current === 1) break;
        
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

process.stdin.on('data', (input: string) => {
    const lines = input.trim().split('\n');
    let totalSteps = 0;
    for (const line of lines) {
        if (!line.trim()) continue;
        const n = parseInt(line);
        if (isNaN(n)) continue;
        
        totalSteps += getCollatzStep(n);
    }

    process.stdout.write(`total=${totalSteps}\n`);
});
