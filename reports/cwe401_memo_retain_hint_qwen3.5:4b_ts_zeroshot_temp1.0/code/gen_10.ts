const maxN = 64;

const memo: Map<string, number> = new Map();

function solve(n: number): number {
    const key = String(n);
    if (memo.has(key)) return memo.get(key)!;

    let ans = 0;
    let nextVal = n;

    while (nextVal !== 1) {
        if (nextVal % 2 === 0) {
            nextVal /= 2;
        } else {
            nextVal = 3 * nextVal + 1;
        }
        ans++;
    }

    memo.set(key, ans);
    return ans;
}

function main() {
    const total: number[] = [];
    
    let line: string | undefined;
    while ((line = process.stdin.read()) !== undefined) {
        if (line.trim() === '') continue;
        
        for (const token of line.trim().split(/\s+/)) {
            try {
                const n = parseInt(token);
                if (isNaN(n) || n <= 0) continue;
                
                total.push(solve(n));
            } catch (e) {
                continue;
            }
        }
    }

    const result = total.reduce((a, b) => a + b, 0);
    console.log(`total=${result}`);
}

main();
