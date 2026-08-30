const results = new Map<number, number>();

function solve(n: number): number {
    if (results.has(n)) return results.get(n)!;
    let steps = 0;
    while (n !== 1) {
        const next = (n % 2 === 0) ? n / 2 : 3 * n + 1;
        n = next as number;
        steps++;
    }
    results.set(n, steps);
    return results.get(n)!;
}

const data: string[] = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
    const s = Buffer.concat(data).toString("utf8");
    const lines = s.split("\n").filter(line => line.trim() !== "");
    let total = 0;
    for (const line of lines) {
        const parts = line.split(/\s+/);
        for (const part of parts) {
            const n = parseInt(part, 10);
            if (!Number.isNaN(n)) {
                total += solve(n);
            }
        }
    }
    console.log(`total=${total}`);
});
