/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から整数クエリを受け取り、
 * nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1に到達するまでの手数を求める。
 * nが1のときの手数は0。
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
        let n: number;
        // 整数として解釈を試みる
        if (!isNaN(parseInt(line, 10))) {
            n = parseInt(line, 10);
        } else {
            // 整数として解釈できない行は無視
            continue;
        }

        if (n === 1) {
            // nが1のときの手数は0
            if (!memo.has(1)) {
                memo.set(1, 0);
            }
            // 既に計算済みであれば加算
            totalCount += memo.get(1)!;
            continue;
        }

        // 再帰的またはメモ化再帰で計算
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
            
            // 経路上のすべての値のメモ化（メモ化再帰の最適化）
            // ここでは、現在の値から1に到達するまでのステップ数を直接計算する
            // 経路上のすべての値のメモ化は、再帰呼び出しの構造に依存するため、
            // 単純な繰り返し計算とメモ化を組み合わせる方が実装が容易で、
            // 経路上のすべての値のメモ化は、この問題の構造上、
            // 経路上の値が非常に多くなり、メモ化の恩恵が限定的になる可能性があるため、
            // 最終的な目標値への到達ステップ数を直接計算するアプローチを採用する。
            
            memo.set(currentN, steps);
            return steps;
        }

        const steps = countSteps(n);
        totalCount += steps;
    }

    // 最終結果の出力
    console.log(`total=${totalCount}`);
}

solve();
