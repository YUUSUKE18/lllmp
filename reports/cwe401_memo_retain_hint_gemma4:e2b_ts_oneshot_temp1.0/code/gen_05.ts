const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (input === "") {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const queries = lines.map(line => parseInt(line, 10));

    // メモ化テーブル
    const memo = new Map<number, number>();
    memo.set(1, 0);

    /**
     * 繰り返し操作の手数を計算する関数 (メモ化付き)
     * @param n 現在の数
     * @returns 1 に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        // 再帰的または反復的に計算
        let current = n;
        let steps = 0;
        const history = new Set<number>(); // 無限ループ防止のための履歴チェック
        
        while (current !== 1) {
            if (history.has(current)) {
                // 無限ループに陥った場合、この経路はスキップ（ただし、この問題の操作は必ず1に収束するはず）
                // 実際には、操作の性質上、1に収束するので、この分岐は理論上発生しないはずだが、安全のため
                // ここでは、もし無限ループが発生した場合、計算を中断する（問題の制約上は不要だが、安全策）
                // ただし、この問題の操作（3n+1, n/2）はCollatzプロブレムと類似しており、1に収束することが期待される。
                break; 
            }
            history.add(current);

            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        // 1に到達できなかった場合は、異常系として扱う（通常は発生しない）
        if (current !== 1) {
             // この問題の制約から、到達しないことは想定されないが、安全のためエラーまたは非常に大きな値とする
             // 今回は制約に従い、到達したと仮定して進める。
             // 実際には、Memoizationの構造上、到達した経路でのみ結果が保存される。
        }


        // 経路上のすべてのステップの結果をメモ化する（動的計画法の考え方）
        // ただし、本問題は「nから1への手数」を求めるため、単一のパス計算で十分。
        // しかし、他のクエリで再利用できるように、経路上の全ての値をメモ化するのが最適。
        
        // ここでは、単に現在の計算結果をメモ化する
        memo.set(n, steps);
        return steps;
    }

    let totalSteps = 0;

    for (const n of queries) {
        if (n < 1) continue; // 1以上の整数のみを考慮

        // メモ化された結果があればそれを使用
        if (memo.has(n)) {
            totalSteps += memo.get(n)!;
        } else {
            // 計算が必要であれば計算実行
            const steps = countSteps(n);
            totalSteps += steps;
        }
    }

    console.log(`total=${totalSteps}`);
}

solve();
