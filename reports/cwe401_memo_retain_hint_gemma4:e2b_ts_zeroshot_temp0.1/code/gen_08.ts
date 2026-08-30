/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から与えられた整数 n に対して、nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求める。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 標準出力へ `total=<合計>` を出力する。
 * 入力は1以上の整数が1行に1個ずつ並ぶ。
 * 空行や整数として解釈できない行は無視する。
 * 64bit整数で収まるが32bit整数には収まらない値も考慮する。
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
        if (!isNaN(Number(trimmedLine))) {
            n = Number(trimmedLine);
        } else {
            // 整数として解釈できない行は無視
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            totalCount += memo.get(n)!;
            continue;
        }

        // 再帰的または反復的に計算
        let steps = 0;
        let currentN = n;

        // 1に到達するまで繰り返す
        while (currentN !== 1) {
            if (currentN <= 0) {
                // 1以上の整数が入力される前提だが、念のため
                break;
            }
            
            if (currentN % 2 === 0) {
                currentN = currentN / 2;
            } else {
                // 3n + 1
                currentN = 3 * currentN + 1;
            }
            steps++;
        }

        // 1に到達したときのステップ数を記録
        // 1の場合は0ステップ
        if (currentN === 1) {
            memo.set(n, steps);
            totalCount += steps;
        }
    }

    // 結果の出力
    console.log(`total=${totalCount}`);
}

solve();
