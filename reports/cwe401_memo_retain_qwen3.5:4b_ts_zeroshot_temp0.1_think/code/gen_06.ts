const memo = new Map<bigint, number>();

function getSteps(n: bigint): number {
    if (n === 1n) return 0;
    if (memo.has(n)) return memo.get(n)!;

    let next: bigint;
    if (n % 2n === 0n) {
        next = n / 2n;
    } else {
        next = 3 * n + 1n;
    }

    const steps = 1 + getSteps(next);
    memo.set(n, steps);
    return steps;
}

const input = process.stdin.read();
if (!input) {
    console.log('total=0');
} else {
    const lines = input.split('\n');
    let totalSum: bigint = 0n;

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        
        try {
            const n = BigInt(trimmed);
            // Spec says >= 1, ignore invalid or out of range
            if (n < 1n) continue; 
            
            totalSum += getSteps(n);
        } catch (e) {
            // Ignore non-integer lines
        }
    }

    console.log(`total=${totalSum}`);
}
