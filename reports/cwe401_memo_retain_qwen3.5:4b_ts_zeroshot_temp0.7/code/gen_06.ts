function main() {
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

    const input = process.stdin.read();
    let lines = input.split('\n');
    
    let total = 0;

    for (const line of lines) {
        if (!line.trim()) continue;
        const num = parseInt(line, 10);
        if (isNaN(num)) continue;
        
        if (num > 0 && !Number.isInteger(num)) continue;
        
        total += calculateSteps(num);
    }

    console.log(`total=${total}`);
}

main();
