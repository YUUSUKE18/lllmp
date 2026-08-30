const memo = new Map<number, number>();

function steps(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;

    let count = 0;
    while (n !== 1) {
        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        count++;
    }

    memo.set(n, count);
    return count;
}

function main() {
    const lines = process.stdin.read().split('\n');
    let total = 0;

    for (const line of lines) {
        if (!line.trim()) continue;
        const num = parseInt(line.trim(), 10);
        if (isNaN(num)) continue;
        
        total += steps(num);
    }

    console.log(`total=${total}`);
}

main();
