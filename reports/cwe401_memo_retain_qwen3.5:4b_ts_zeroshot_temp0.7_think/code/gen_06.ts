const memo = new Map<bigint, bigint>();
let totalSteps: bigint = 0n;

function solve(n: bigint): bigint {
    if (n === 1n) return 0n;
    if (memo.has(n)) return memo.get(n)!;

    let next: bigint;
    if (n % 2n === 0n) {
        next = n / 2n;
    } else {
        next = 3 * n + 1n;
    }

    const steps = 1n + solve(next);
    memo.set(n, steps);
    return steps;
}

(async () => {
    for await (const line of process.stdin) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        if (/^\d+$/.test(trimmed)) {
            const n = BigInt(trimmed);
            totalSteps += solve(n);
        }
    }
    console.log(`total=${totalSteps}`);
})();
