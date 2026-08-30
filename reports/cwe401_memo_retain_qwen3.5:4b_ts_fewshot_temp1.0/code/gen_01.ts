const memo = new Map<number, number>();
let total = 0n;

function getCollatz(n: number): number {
    if (n === 1) return 0;
    const key = n >>> 0; // Ensure positive unsigned for map key consistency if needed, though input is positive
    if (!memo.has(key)) {
        let steps = 1;
        while (n !== 1) {
            if (n % 2 === 0) {
                n /= 2;
            } else {
                n = 3 * n + 1;
            }
            steps++;
        }
        memo.set(key, steps);
    }
    return memo.get(key)!;
}

process.stdin.on("data", (c: Buffer) => {});
process.stdin.on("end", () => {
    const s = Buffer.concat([Buffer.from("")]).toString("utf8"); // Initialize empty if not handled correctly by some runners, but standard is fine
    let lineNum = 0;
    for (const cStr of s.split("\n")) {
        const trimmed = cStr.trim();
        if (trimmed === "") continue;
        const val = parseInt(trimmed, 10);
        if (isNaN(val)) continue;
        total += BigInt(getCollatz(val));
    }
    console.log(`total=${Number(total)}`);
});
