/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から与えられた整数 n に対して、
 * n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求める。
 * n=1 のときの手数は 0。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 標準出力へ `total=<合計>` を出力する。
 * 
 * 言語・形式: Node.js で動く完全な TypeScript。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // メモ化テーブル
    const memo: Map<number, number> = new Map();
    let totalCount = 0;

    for (const line of lines) {
        let n: number;
        try {
            n = parseInt(line, 10);
        } catch (e) {
            // 整数として解釈できない行は無視
            continue;
        }

        if (isNaN(n) || n < 1) {
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            totalCount += memo.get(n);
            continue;
        }

        // 再帰的または反復的に計算
        let steps = 0;
        let currentN = n;

        while (currentN !== 1) {
            if (currentN % 2 === 0) {
                currentN = currentN / 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            steps++;
        }

        // 結果をメモ化し、合計に加算
        memo.set(n, steps);
        totalCount += steps;
    }

    // 結果の出力
    console.log(`total=${totalCount}`);
}

solve();
