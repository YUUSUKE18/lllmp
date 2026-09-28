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

    // 1. 入力のパースとクエリの処理
    const queries = lines.map(line => parseInt(line, 10));
    
    if (isNaN(queries).some(isNaN)) {
        // 整数として解釈できない行は無視されるが、ここでは入力が全て整数であると仮定する
        // 仕様に従い、整数として解釈できない行は無視する処理を念頭に置く
    }

    // 2. メモ化された関数 (メモ化を実装するため、ここでは再帰とメモ化を組み合わせる)
    const memo = new Map<number, number>();

    /**
     * 置き換え操作の回数を計算する関数 (3n+1問題)
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

        let steps = 0;
        let current = n;
        
        // 1に到達するまでのステップを計算
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // 計算結果をメモ化
        memo.set(n, steps);
        return steps;
    }

    // 3. 全クエリの処理と合計の計算
    let total = 0;
    for (const n of queries) {
        if (n >= 1) {
            total += countSteps(n);
        }
    }

    // 4. 結果の出力
    console.log(`total=${total}`);
}

solve();
