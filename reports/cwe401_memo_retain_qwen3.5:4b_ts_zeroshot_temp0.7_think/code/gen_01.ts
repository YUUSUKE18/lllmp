const memo = new Map<bigint, number>();

function steps(n: bigint): number {
    if (n === 1n) return 0;
    if (memo.has(n)) return memo.get(n)!;

    let next: bigint;
    if (n % 2n === 0n) {
        next = n / 2n;
    } else {
        next = 3n + 1n;
    }

    const count = 1 + steps(next);
    memo.set(n, count);
    return count;
}

const input = process.stdin.read();
let totalSteps: bigint = 0n;

if (input) {
    for (const line of input.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        
        // Ignore non-integer lines. Input is >= 1 integer per spec.
        if (/^\d+$/.test(trimmed)) {
            const n = BigInt(trimmed);
            totalSteps += steps(n);
        }
    }
}

console.log(`total=${totalSteps}`);
