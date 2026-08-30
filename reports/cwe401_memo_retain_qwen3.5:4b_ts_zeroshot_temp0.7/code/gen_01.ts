const memo: Map<string, number> = new Map();

function calculateCollatz(n: number): number {
    const key = String(n);
    if (memo.has(key)) {
        return memo.get(key)!;
    }

    let count = 0;
    while (n !== 1) {
        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        count++;
    }

    memo.set(key, count);
    return count;
}

process.stdin.on('data', (data) => {
    const lines = data.trim().split('\n');
    let total = 0;

    for (const line of lines) {
        if (!line.trim()) continue;
        
        try {
            const n = parseInt(line.trim(), 10);
            if (isNaN(n)) continue;
            
            total += calculateCollatz(n);
        } catch {
            continue;
        }
    }

    console.log(`total=${total}`);
});
