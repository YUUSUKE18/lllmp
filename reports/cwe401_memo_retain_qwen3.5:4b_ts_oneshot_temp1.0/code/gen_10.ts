const memo = new Map<number, number>();
function step(n: number): number {
    if (n === 1) return 0;
    const cached = memo.get(n);
    if (cached !== undefined) return cached;
    let nextN = n % 2 === 0 ? n / 2 : 3 * n + 1;
    const result = 1 + step(nextN);
    memo.set(n, result);
    return result;
}

process.stdin.on("data", (c) => {
    const lines = c.toString("utf8").split(/\r?\n/);
    let total = 0;
    for (const line of lines) {
        if (!line.trim()) continue;
        const parts = line.split(/\s+/);
        for (const p of parts) {
            const n = parseInt(p, 10);
            if (Number.isNaN(n)) continue;
            total += step(n);
        }
    }
});

process.stdin.on("end", () => {
    console.log(`total=${total}`);
});
