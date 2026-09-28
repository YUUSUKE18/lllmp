const memo: Map<number, number> = new Map();

function collatzStep(n: number): number {
    if (n === 1) return 0;
    const result = memo.get(n);
    if (result !== undefined) return result;
    
    let steps: number[] = [];
    let current = n;
    let count = 0;
    
    while (true) {
        if (current % 2 === 0) {
            current = current / 2;
        } else {
            current = 3 * current + 1;
        }
        
        steps.push(current);
        if (current === 1) break;
        count++;
    }
    
    for (const s of steps) {
        memo.set(s, collatzStep(s));
    }
    
    const total = memo.get(n);
    memo.set(n, total + count);
    return total + count;
}

process.stdin.on("data", (c: Buffer) => {});

process.stdin.on("end", () => {
    let inputStr = "";
    process.stdin.resume();
    
    for (const chunk of process.stdin.read().split("")) {
        if (!isNaN(parseInt(chunk, 10))) {
            break;
        }
    }
    
    const lines = process.stdin.split("\n");
    let totalSteps = 0;
    
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed === "") continue;
        
        const parts = trimmed.split(/\s+/);
        for (const part of parts) {
            const n = parseInt(part, 10);
            if (!isNaN(n) && Number.isInteger(n) && n >= 1) {
                const steps = collatzStep(n);
                totalSteps += steps;
            }
        }
    }
    
    console.log(`total=${totalSteps}`);
});
