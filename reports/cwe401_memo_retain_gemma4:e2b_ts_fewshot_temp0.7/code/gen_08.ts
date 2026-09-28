const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    if (lines.length === 0) {
        console.log("total=0");
        return;
    }

    const numbers = lines.map(Number);
    
    if (numbers.length === 0) {
        console.log("total=0");
        return;
    }

    // メモ化のためのマップ
    const memo = new Map<number, number>();
    memo.set(1, 0);

    /**
     * 置き換え操作を繰り返す手数を計算する関数
     * @param n 初期値
     * @returns 1 に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (memo.has(n)) {
            return memo.get(n)!;
        }
        
        let currentN = n;
        let steps = 0;
        const history = new Set<number>();

        while (currentN !== 1) {
            if (history.has(currentN)) {
                // サイクルに陥った場合、現在のステップ数とサイクル長を考慮して計算を終了
                // この問題の操作 (n=n/2 or n=3n+1) は通常、1に収束するため、
                // サイクル検出は最適化として重要だが、ここでは1に到達することを期待する。
                // サイクル検出が厳密には必要になるのは、操作が逆向きに適用可能である場合。
                // 今回は「1に到達するまでの手数」なので、単純に再帰的または反復的に進める。
                // 3n+1問題では、サイクルは必ずしも発生しないか、1に収束する。
                // 64bit整数範囲内での計算なので、再帰の深さ制限やメモ化で十分と判断する。
            }
            
            if (currentN === 1) {
                break;
            }
            
            // 奇数なら 3n+1, 偶数なら n/2
            if (currentN % 2 === 0) {
                currentN /= 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            
            steps++;
            history.add(currentN);
        }

        // 1に到達した後のステップ数を記録
        memo.set(n, steps);
        return steps;
    }

    let total = 0;
    for (const n of numbers) {
        if (Number.isInteger(n) && n >= 1) {
            total += countSteps(n);
        }
    }

    console.log(`total=${total}`);
}

solve();
