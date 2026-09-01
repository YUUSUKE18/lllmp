const memo = new Map<number, number>();

function collatzStep(n: number): number {
    if (n === 1) return 0;
    const result = memo.get(n);
    if (result !== undefined) return result;

    let steps = 0;
    let curr = n;

    while (curr !== 1) {
        if (curr % 2 === 0) {
            curr = curr / 2;
        } else {
            curr = 3 * curr + 1;
        }
        steps++;
    }

    memo.set(n, steps);
    return steps;
}

process.stdin.on("data", (c: Buffer) => {
    const s = c.toString("utf8").trim();
    if (s === "") return;
    const parts = s.split(/\s+/).map((x: string) => parseInt(x, 10)).filter((n): n is number => !Number.isNaN(n));
    let total = 0;

    for (const n of parts) {
        if (Number.isNaN(n) || n < 1) continue;
        if (!Number.isFinite(n)) continue;
        
        total += collatzStep(n);
    }

    console.log(`total=${total}`);
});
