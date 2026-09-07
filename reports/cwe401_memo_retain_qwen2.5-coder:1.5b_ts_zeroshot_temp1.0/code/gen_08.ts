function processQuery(n: number): number {
    if (n === 1) return 0;
    const memo = new Map<number, number>();
    let steps = 0;
    while (n !== 1) {
        if (memo.has(n)) {
            return steps + memo.get(n);
        }
        memo.set(n, steps);
        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        steps++;
    }
    return steps;
}

process.stdin.on('data', (chunk) => {
    const input = chunk.toString();
    const queries = input.split('\n').filter(line => line !== '');
    let totalSteps = 0;
    for (const query of queries) {
        const n = parseInt(query, 10);
        if (!isNaN(n)) {
            totalSteps += processQuery(n);
        }
    }
    console.log(`total=${totalSteps}`);
});
