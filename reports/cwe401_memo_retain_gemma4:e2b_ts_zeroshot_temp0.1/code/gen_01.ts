/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から与えられた整数 n に対して、nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求める。
 * n=1 のときの手数は 0。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 標準出力へ `total=<合計>` を出力する。
 * Node.js で動作する完全な TypeScript。
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
            const count = 0;
            memo.set(1, 0);
            totalCount += count;
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            const count = memo.get(n)!;
            totalCount += count;
            continue;
        }

        // 再帰的または反復的に計算
        let currentN = n;
        let steps = 0;
        const path: number[] = []; // 経路を記録してメモ化に利用する

        while (currentN !== 1) {
            if (memo.has(currentN)) {
                // 途中でメモ化された値に到達した場合
                const memoSteps = memo.get(currentN)!;
                steps += memoSteps;
                // 現在の経路を遡って合計を計算
                for (let i = path.length - 1; i >= 0; i--) {
                    const node = path[i];
                    if (memo.has(node)) {
                        steps += memo.get(node)!;
                    }
                }
                // 現在のnから計算した結果をメモ化し、ループを抜ける
                memo.set(n, steps);
                break;
            }

            path.push(currentN);

            if (currentN % 2 === 0) {
                currentN = currentN / 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            steps++;
        }

        // ループが終了した場合 (currentNが1になった場合)
        if (currentN === 1) {
            // 経路上のすべてのステップをメモ化する
            let currentTotal = 0;
            for (const node of path) {
                if (memo.has(node)) {
                    currentTotal += memo.get(node)!;
                }
            }
            // nから1までの総ステップ数を計算し、nをメモ化する
            memo.set(n, currentTotal);
            totalCount += currentTotal;
        }
    }

    // 最終結果の出力
    console.log(`total=${totalCount}`);
}

solve();
