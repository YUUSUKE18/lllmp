/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から整数クエリを読み込み、
 * nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1に到達するまでの手数を求める。
 * n=1のときは手数は0。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 標準出力へ `total=<合計>` を出力する。
 * Node.jsで動作する完全なTypeScript。
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
        const n = parseInt(line, 10);

        if (isNaN(n) || n < 1) {
            continue; // 整数として解釈できない行や1未満の値を無視
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            totalCount += memo.get(n);
            continue;
        }

        // 計算処理 (メモ化再帰/動的計画法)
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

        // 1に到達するまでの手数をメモ化
        memo.set(n, steps);
        totalCount += steps;
    }

    // 結果の出力
    console.log(`total=${totalCount}`);
}

solve();
