const memo = new Map<number, number>();

function solve(n: number): number {
    if (n === 1) return 0;
    
    let current = n;
    let steps = 0;
    
    while (current !== 1) {
        if (!memo.has(current)) {
            memo.set(current, steps);
        }
        
        if (current % 2 === 0) {
            current = Math.floor(current / 2);
        } else {
            current = 3 * current + 1;
        }
        steps++;
    }
    
    return memo.get(current!)!;
}

function main() {
    const lines = process.stdin.read().split('\n');
    let total = 0;
    
    for (const line of lines) {
        if (!line.trim()) continue;
        
        const n = parseInt(line.trim(), 10);
        if (isNaN(n)) continue;
        
        // 負の整数は問題文「1 以上の整数」と矛盾するため無視または処理外とするが、
        // 仕様は「1 以上の整数」とあるので、有効な範囲のみ処理。
        if (n < 1) continue;
        
        total += solve(n);
    }
    
    console.log(`total=${total}`);
}

main();
