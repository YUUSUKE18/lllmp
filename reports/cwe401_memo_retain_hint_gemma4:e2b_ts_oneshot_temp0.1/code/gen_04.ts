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

    // 1. 入力のパース
    const initialNumbers = lines.map(line => parseInt(line, 10));
    
    if (initialNumbers.length === 0) {
        console.log("total=0");
        return;
    }

    // 2. メモ化された関数 (Memoization)
    const memo = new Map<number, number>();

    /**
     * 置き換え操作を繰り返して 1 に到達するまでの手数を計算する
     * @param n 初期値
     * @returns 手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 0;
        let current = n;
        
        // 1 に到達するまでのステップを計算
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // 経路上のすべての値のメモ化（これは、各クエリが独立しているため、
        // 経路上の値が他のクエリに影響を与えるわけではないが、
        // 効率化のため、この関数内で計算された経路をメモ化する）
        // ただし、問題の意図は「各クエリ n について、n から 1 への経路の長さを求める」
        // したがって、n から 1 への経路の長さを計算するだけで十分。
        
        memo.set(n, steps);
        return steps;
    }

    // 3. 全クエリの処理と合計の計算
    let totalSteps = 0;
    for (const n of initialNumbers) {
        if (n >= 1) {
            totalSteps += countSteps(n);
        }
    }

    // 4. 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
