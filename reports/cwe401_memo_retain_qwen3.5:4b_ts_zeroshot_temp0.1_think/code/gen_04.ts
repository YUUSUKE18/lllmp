const memo = new Map<bigint, number>();

function getSteps(n: bigint): number {
    if (n === 1n) return 0;
    if (memo.has(n)) return memo.get(n)!;

    let next: bigint;
    if (n % 2n === 0n) {
        next = n / 2n;
    } else {
        next = (3 * n) + 1n;
    }

    const steps = getSteps(next);
    memo.set(n, steps + 1);
    return steps + 1;
}

function main() {
    const input = process.stdin.read();
    if (!input) return;

    const lines = input.split('\n');
    let totalSum: bigint = 0n;

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        try {
            const n = BigInt(trimmed);
            const steps = getSteps(n);
            totalSum += BigInt(steps);
        } catch (e) {
            // Ignore invalid lines
        }
    }

    console.log(`total=${totalSum}`);
}

main();
