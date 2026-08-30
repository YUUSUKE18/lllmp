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
                    current = 3 * current + 1;
                }
                steps++;
            }

            // 経路上のすべての値のメモ化（より効率的なメモ化のため）
            // ただし、この問題は「1に到達するまでの手数」を求めるため、
            // 経路上の各ステップの数を直接計算する方が、
            // 経路上のすべての値のメモ化よりも直接的である。
            // ここでは、現在のNから1への手数を計算し、その結果をメモする。
            memo.set(currentN, steps);
            return steps;
        }

        // 計算実行
        const steps = countSteps(n);
        totalCount += steps;
    }

    // 結果の出力
    console.log(`total=${totalCount}`);
}

solve();
