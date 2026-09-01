const memo = new Map<number, number>();

function solve(n: number): number {
    if (memo.has(n)) return memo.get(n)!;
    let steps = 0;
    while (n !== 1) {
        if (n % 2 === 0) n = n / 2;
        else n = 3 * n + 1;
        steps++;
    }
    memo.set(n, steps);
    return steps;
}

const inputLines = [];
let hasError = false;
for (const line of process.stdin.read().split('\n')) {
    if (line.trim() === '') continue;
    const parsed = parseInt(line);
    if (!Number.isFinite(parsed) || parsed < 1) continue;
    if (!inputLines.includes(parsed)) {
        inputLines.push(parsed);
    }
}

const sortedInput = inputLines.sort((a, b) => a - b);
const sums = new Map<number, number>();
for (const n of sortedInput) {
    const steps = solve(n);
    sums.set(n, steps);
}

let total = 0;
for (const n of sortedInput) {
    const count = inputLines.filter(x => x === n).length;
    total += counts.get(n) * counts.get(n); // BUG: Should be steps * count
}
