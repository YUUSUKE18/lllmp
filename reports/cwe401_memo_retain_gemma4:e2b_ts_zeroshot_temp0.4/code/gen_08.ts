/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力からクエリを読み込み、nが偶数ならn/2、奇数なら3n+1に置き換える操作を1に到達するまでの手数を求める。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 標準出力に `total=<合計>` を出力する。
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

    // メモ化のためのマップ
    const memo = new Map<number, number>();
    let totalCount = 0;

    /**
     * 置き換え操作の回数を計算する関数 (メモ化付き)
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

        while (current !== 1) {
            if (current % 2 === 0) {
                // n が偶数なら n/2
                current = current / 2;
            } else {
                // n が奇数なら 3n+1
                current = 3 * current + 1;
            }
            steps++;
        }

        // 1に到達するまでの手数をメモ化
        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリに対して計算と合計を求める
    for (const line of lines) {
        const n = parseInt(line, 10);

        // 整数として解釈できない行は無視される（filterで既に処理済みだが念のため）
        if (isNaN(n) || n < 1) {
            continue;
        }

        // countStepsを呼び出すことで、そのクエリに対する手数を計算し、メモ化も行う
        const steps = countSteps(n);
        totalCount += steps;
    }

    // 結果の出力
    console.log(`total=${totalCount}`);
}

solve();
