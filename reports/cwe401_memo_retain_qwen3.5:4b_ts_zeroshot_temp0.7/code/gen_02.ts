const memo = new Map<number, number>();

function calcSteps(n: number): number {
    if (memo.has(n)) return memo.get(n)!;
    if (n === 1) {
        memo.set(1, 0);
        return 0;
    }
    let steps: number;
    if (n % 2 === 0) {
        steps = calcSteps(n / 2);
    } else {
        const nextVal = 3 * n + 1;
        steps = calcSteps(nextVal);
    }
    memo.set(n, steps + 1);
    return steps + 1;
}

const total: number[] = [];

function processLine(line: string): void {
    const trimmed = line.trim();
    if (!trimmed) return;
    let num: number;
    try {
        num = parseInt(trimmed, 10);
    } catch {
        return;
    }
    if (isNaN(num)) return;
    const steps = calcSteps(num);
    total.push(steps);
}

for (const line of process.stdin) {
    processLine(line);
}

console.log(`total=${total.reduce((a, b) => a + b, 0)}`);
