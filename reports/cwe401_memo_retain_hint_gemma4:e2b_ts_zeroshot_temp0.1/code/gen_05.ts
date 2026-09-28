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
 * 64bit整数で収まるが32bit整数を超える値も考慮する。
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

        if (isNaN(n) || n < 1) {
            // 1以上の整数でない場合は無視（仕様上は1以上の整数が与えられる前提だが念のため）
            continue;
        }

        // 再帰/メモ化による計算関数
        function countSteps(currentN: number): number {
            if (currentN === 1) {
                return 0;
            }
            if (memo.has(currentN)) {
                return memo.get(currentN)!;
            }

            let steps = 0;
            let current = currentN;

            while (current !== 1) {
                if (current % 2 === 0) {
                    current = current / 2;
                } else {
                    // 3n + 1
                    current = 3 * current + 1;
                }
                steps++;
            }

            // 経路上のすべての値のメモ化（これは、各クエリで計算された経路の長さを求めるのではなく、
            // 1から到達するまでの最短経路を求める問題として解釈し、各クエリの計算結果をメモ化する）
            // 仕様の「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます」
            // は、その特定の n から 1 に到達するまでの操作回数を求めることを意味する。
            
            // ここで、memo化は「nから1への手数」を格納する。
            memo.set(currentN, steps);
            return steps;
        }

        const steps = countSteps(n);
        totalCount += steps;
    }

    // 結果の出力
    console.log(`total=${totalCount}`);
}

solve();
