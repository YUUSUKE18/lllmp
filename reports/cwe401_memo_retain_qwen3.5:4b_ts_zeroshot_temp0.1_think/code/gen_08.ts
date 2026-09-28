const memo = new Map<bigint, number>();

function getSteps(n: bigint): number {
    if (n === 1n) return 0;
    if (memo.has(n)) return memo.get(n)!;

    let nextN: bigint;
    if (n % 2n === 0n) {
        nextN = n / 2n;
    } else {
        nextN = n * 3n + 1n;
    }

    const steps = getSteps(nextN);
    memo.set(n, steps + 1);
    return steps + 1;
}

const input = process.stdin.read().split('\n');
let totalSum: bigint = 0n;

for (const line of input) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    let n: bigint;
    try {
        n = BigInt(trimmed);
    } catch {
        continue;
    }

    if (n < 1n) continue;

    const steps = getSteps(n);
    totalSum += BigInt(steps);
}

console.log(`total=${totalSum}`);
