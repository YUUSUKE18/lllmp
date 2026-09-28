const memo = new Map<BigInt, number>();

function getSteps(n: bigint): number {
    if (n === 1n) return 0;
    if (memo.has(n)) return memo.get(n)!;

    const nextN = n % 2n === 0n ? n / 2n : 3n + 1n;
    const steps = getSteps(nextN);
    memo.set(n, steps + 1);
    return steps + 1;
}

const input = process.stdin.read();
if (!input) {
    console.log('total=0');
    process.exit(0);
}

let totalSum: bigint = 0n;
const lines = input.split('\n');

for (const line of lines) {
    if (!line.trim()) continue;
    
    const match = line.match(/^[+-]?\d+$/);
    if (!match) continue;
    
    const nStr = match[0];
    const n: bigint = BigInt(nStr);
    
    try {
        totalSum += BigInt(getSteps(n));
    } catch (e) {
        // Ignore unexpected errors during calculation
    }
}

console.log('total=' + totalSum.toString());
