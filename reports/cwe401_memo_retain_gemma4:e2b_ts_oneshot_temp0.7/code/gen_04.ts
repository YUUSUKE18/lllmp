const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const queries = lines.map(line => parseInt(line, 10));

    // メモ化テーブル
    const memo = new Map<number, number>();
    memo.set(1, 0);

    /**
     * 置き換え操作を繰り返して 1 に到達するまでの手数を計算する
     * @param n 初期値
     * @returns 1 に到達するまでの手数
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
        const path = new Set<number>();

        while (current !== 1) {
            if (path.has(current)) {
                // サイクルに陥った場合（通常この問題では発生しないはずだが、安全のため）
                // ただし、この問題の操作は常に1に収束するため、これは理論上発生しない
                // サイクル検出を厳密に行う場合は、この分岐でエラーや特殊な処理が必要になるが、
                // 3n+1問題では必ず1に収束するため、ここでは単純に続行する。
            }
            path.add(current);

            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // 経路上のすべての値のメモ化を更新する
        // これは、計算途中の値も考慮してメモ化を正しく行うため。
        // ただし、この問題の要求は「n から 1 への手数」のみなので、
        // サイクル検出をせずに、現在の計算パスのみをメモ化する。
        // 厳密には、再帰的なメモ化（動的計画法）が最も効率的。

        // 再帰的なメモ化で再計算する方が、サイクル検出を伴うループよりも安全で効率的。
        // ここでは、ループ内で直接計算した結果をメモ化する。
        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリに対する手数を合計する
    let totalSteps = 0;
    for (const n of queries) {
        // 各クエリに対して、memo化された結果を使用する
        if (!memo.has(n)) {
            // メモ化されていない場合、計算を実行してメモ化する
            totalSteps += countSteps(n);
        } else {
            // メモ化されている場合、取得する
            totalSteps += memo.get(n)!;
        }
    }

    // 最終結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
