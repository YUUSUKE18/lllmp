const inputStr = process.stdin.read();
if (inputStr === null) {
    console.log('total=0');
} else {
    const input = inputStr.split('\n');

    const memo = new Map<bigint, number>();

    function getSteps(n: bigint): number {
        if (n === 1n) return 0;
        if (memo.has(n)) return memo.get(n)!;

        let nextN: bigint;
        if (n % 2n === 0n) {
            nextN = n / 2n;
        } else {
            nextN = 3 * n + 1n;
        }

        const subSteps = getSteps(nextN);
        memo.set(n, subSteps + 1);
        return subSteps + 1;
    }

    let totalSum = 0n; 

    for (const line of input) {
        const trimmed = line.trim();
        if (!trimmed || !/^\d+$/.test(trimmed)) continue;
        
        const n = BigInt(trimmed);
        
        if (memo.has(n)) {
            totalSum += memo.get(n)!;
        } else {
            const steps = getSteps(n);
            totalSum += BigInt(steps);
        }
    }

    console.log(`total=${totalSum}`);
}
