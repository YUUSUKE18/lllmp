const lines = process.stdin.read().split('\n');
const memo = new Map<bigint, bigint>();
memo.set(1n, 0n);
let totalSum: bigint = 0n;

function getSteps(n: bigint): bigint {
    if (memo.has(n)) return memo.get(n)!;
    
    const nextN = (n % 2n === 0n) ? n / 2n : 3n + 1n;
    const steps = getSteps(nextN);
    
    memo.set(n, steps + 1n);
    return steps + 1n;
}

for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    try {
        const n = BigInt(trimmed);
        if (n >= 1n) {
            totalSum += getSteps(n);
        }
    } catch (e) {
        // Ignore invalid integer lines
    }
}

console.log(`total=${totalSum}`);
