const memo = new Map<number, number>();

function collatzStep(n: number): number {
    if (n === 1) return 0;
    const prev = memo.get(n);
    if (prev !== undefined) return prev;

    let steps = 0;
    while (true) {
        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        steps++;
        if (n === 1) break;
    }

    memo.set(n, steps);
    return steps;
}

function main() {
    const lines = process.stdin.read().split('\n');
    let total = 0;

    for (const line of lines) {
        if (!line.trim()) continue;
        const n = parseInt(line.trim(), 10);
        if (isNaN(n)) continue;
        if (n < 1) continue;

        total += collatzStep(n);
    }

    console.log(`total=${total}`);
}

main();
