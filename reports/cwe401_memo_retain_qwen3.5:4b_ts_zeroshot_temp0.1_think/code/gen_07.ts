const memo = new Map<bigint, number>();

function getSteps(n: bigint): number {
    if (n === 1n) return 0;
    if (memo.has(n)) return memo.get(n)!;

    let nextN: bigint;
    if (n % 2n === 0n) {
        nextN = n / 2n;
    } else {
        nextN = 3n + 1n;
    }

    const steps = 1 + getSteps(nextN);
    memo.set(n, steps);
    return steps;
}

const input = process.stdin.read();
if (!input) {
    console.log('total=0');
    process.exit(0);
}

let totalSum: bigint = 0n;
const lines = input.split(/\r?\n/);

for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    try {
        const n = BigInt(trimmed);
        if (n < 1n) continue; 
        
        totalSum += getSteps(n);
    } catch (e) {
        // Ignore invalid lines
    }
}

console.log(`total=${totalSum}`);
