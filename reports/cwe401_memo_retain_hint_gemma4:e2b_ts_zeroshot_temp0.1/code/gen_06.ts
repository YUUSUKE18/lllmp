/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から与えられた整数 n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求める。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 標準出力へ `total=<合計>` を出力する。
 * 入力は1以上の整数が1行に1個ずつ並ぶ。
 * 空行や整数として解釈できない行は無視する。
 * 64bit整数で収まるが32bitを超える値も考慮する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    // メモ化テーブル
    const memo = new Map<number, number>();
    let totalCount = 0;

    // 入力処理
    for (const line of input) {
        const trimmedLine = line.trim();
        if (trimmedLine === "") continue;

        let n: number;
        // 整数として解釈を試みる
        if (!isNaN(parseInt(trimmedLine, 10))) {
            n = parseInt(trimmedLine, 10);
        } else {
            // 整数として解釈できない行は無視
            continue;
        }

        // nが1以上の整数であることを確認（仕様上は保証されているが念のため）
        if (n < 1) continue;

        // 再帰的または反復的に手数を計算（メモ化を利用）
        function countSteps(currentN: number): number {
            if (currentN === 1) {
                return 0;
            }
            if (memo.has(currentN)) {
                return memo.get(currentN)!;
            }

            let steps = 0;
            let current = currentN;

            // 1に到達するまでの手数を計算
            while (current !== 1) {
                if (current % 2 === 0) {
                    current = current / 2;
                } else {
                    // 3n + 1
                    current = 3 * current + 1;
                }
                steps++;
            }

            // 計算結果をメモ化
            memo.set(currentN, steps);
            return steps;
        }

        // クエリ n の手数を計算し、合計に加算
        const steps = countSteps(n);
        totalCount += steps;
    }

    // 結果の出力
    console.log(`total=${totalCount}`);
}

solve();
