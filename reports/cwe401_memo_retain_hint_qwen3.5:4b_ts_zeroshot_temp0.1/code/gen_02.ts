const memo = new Map<number, number>();

function collatzStep(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;
    
    let steps = 0;
    while (n !== 1) {
        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        steps++;
    }
    
    memo.set(n, steps);
    return steps;
}

function processInput() {
    const lines = process.stdin.read().split('\n');
    let totalSteps = 0;
    
    for (const line of lines) {
        if (!line.trim()) continue;
        
        const n = parseInt(line.trim(), 10);
        if (isNaN(n)) continue;
        
        // 負の整数は問題文の「1 以上の整数」と矛盾するため無視または処理しないが、
        // 仕様では「1 以上の整数」とあるので、正の整数のみを処理する。
        // ただし、3n+1 が負になることはないので、n が負の場合もループ条件 n !== 1 で無限ループに陥らないように注意が必要だが、
        // 問題文は「1 以上の整数」なので、入力値が正の整数であると仮定して処理する。
        // もし入力が負の場合、3n+1 は負のままになり、n/2 も負のままになるため無限ループになる可能性がある。
        // しかし、仕様は「1 以上の整数」と明記されているので、そのような入力はないと想定する。
        
        totalSteps += collatzStep(n);
    }
    
    console.log(`total=${totalSteps}`);
}

processInput();
