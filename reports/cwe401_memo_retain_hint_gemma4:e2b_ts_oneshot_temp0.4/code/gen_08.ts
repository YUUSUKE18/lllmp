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

    // 1. 入力のパースとクエリの抽出
    const queries = [];
    for (const line of lines) {
        const n = parseInt(line, 10);
        if (!isNaN(n) && n >= 1) {
            queries.push(n);
        }
    }

    // 2. メモ化された関数 (手数を求める関数)
    const memo = new Map<number, number>();

    /**
     * 置き換え操作を繰り返し、1に到達するまでの手数を計算する
     * @param n 初期値
     * @returns 1に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current = n;
        let steps = 0;
        
        // 1に到達するまで繰り返す
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // 経路上のすべての値のメモ化 (DP的なアプローチ)
        // ただし、この問題は「1に到達するまでの手数」を求めるため、
        // 経路上の各ステップの数を数えるのではなく、単に最終的な手数を計算すればよい。
        // ここでは、各クエリに対して直接計算し、その結果を合計する。
        
        memo.set(n, steps);
        return steps;
    }

    // 3. すべてのクエリの手数の合計を計算
    let total = 0;
    for (const n of queries) {
        total += countSteps(n);
    }

    // 4. 結果の出力
    console.log(`total=${total}`);
}

solve();
