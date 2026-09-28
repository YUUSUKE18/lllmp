/**
 * 仕様を満たすプログラム
 * 
 * 仕様：
 * 標準入力から与えられた整数に対する操作（nが偶数ならn/2、奇数なら3n+1）を繰り返し、1に到達するまでの手数を求める。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 標準出力に `total=<合計>` を出力する。
 * 入力は1行に1個ずつ並ぶ。
 * 整数として解釈できない行や空行は無視する。
 * 64bit整数で収まるが32bitを超える値も考慮する。
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
    const memo = new Map<number, number>();
    let totalCount = 0;

    for (const line of lines) {
        let n: number;
        // 整数として解釈を試みる
        if (!isNaN(parseInt(line, 10))) {
            n = parseInt(line, 10);
        } else {
            // 整数として解釈できない行は無視する (仕様に従う)
            continue;
        }

        if (isNaN(n) || n < 1) {
            // 1以上の整数が与えられる前提だが、念のため
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            // 既に計算済みの場合は、その結果を合計に加える
            totalCount += memo.get(n)!;
            continue;
        }

        // 再帰的または反復的に計算
        let steps = 0;
        let currentN = n;

        // 1に到達するまで繰り返す
        while (currentN !== 1) {
            if (currentN <= 0) {
                // 負の値や0になることは通常発生しないが、安全策として
                break;
            }
            
            if (currentN % 2 === 0) {
                // n が偶数なら n/2
                currentN = currentN / 2;
            } else {
                // n が奇数なら 3n+1
                currentN = 3 * currentN + 1;
            }
            steps++;
        }

        // 1に到達したときのステップ数をメモ化
        memo.set(n, steps);
        totalCount += steps;
    }

    // 結果の出力
    console.log(`total=${totalCount}`);
}

solve();
