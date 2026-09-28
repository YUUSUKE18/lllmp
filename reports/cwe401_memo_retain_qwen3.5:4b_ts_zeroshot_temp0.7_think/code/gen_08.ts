const memo = new Map<bigint, bigint>();

function calculateSteps(n: bigint): bigint {
    if (n === 1n) return 0n;
    if (memo.has(n)) return memo.get(n)!;

    let nextN = n;
    const isEven = nextN % 2n === 0n;
    
    const steps = isEven 
        ? 1 + calculateSteps(nextN / 2n) 
        : 1 + calculateSteps(nextN * 3n + 1n);

    memo.set(n, steps);
    return steps;
}

const input = process.stdin.read().split('\n');
let totalSum = 0n;

for (const line of input) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    let n: bigint;
    try {
        n = BigInt(trimmed);
    } catch (e) {
        continue;
    }

    totalSum += calculateSteps(n);
}

console.log(`total=${totalSum}`);
