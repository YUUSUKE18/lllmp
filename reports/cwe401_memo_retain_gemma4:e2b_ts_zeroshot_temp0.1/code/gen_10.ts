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
            // 整数として解釈できない行は無視 (仕様に従う)
            continue;
        }

        if (n === 1) {
            // n=1 のときの手数は 0
            const count = 0;
            if (!memo.has(n)) {
                memo.set(n, count);
            }
            totalCount += count;
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            totalCount += memo.get(n)!;
            continue;
        }

        // 再帰的または反復的に計算
        let currentN = n;
        let steps = 0;
        const path: number[] = []; // 経路を記録してメモ化に利用する

        while (currentN !== 1) {
            if (memo.has(currentN)) {
                // 途中でメモ化された値に到達した場合
                steps += memo.get(currentN)!;
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

        // 最終的な結果を計算し、経路上のすべての値にメモ化する
        if (currentN === 1) {
            // 1 に到達するまでの手数を計算し、経路上のすべての値にメモ化する
            let currentSteps = 0;
            const history = [];
            let tempN = n;
            
            while (tempN !== 1) {
                history.push(tempN);
                if (tempN % 2 === 0) {
                    tempN /= 2;
                } else {
                    tempN = 3 * tempN + 1;
                }
                currentSteps++;
            }
            history.push(1); // 最終的な1も記録
            
            // 逆順に計算して手数を求める
            let finalSteps = 0;
            for (let i = history.length - 2; i >= 0; i--) {
                const prev = history[i];
                const curr = history[i + 1];
                
                if (prev % 2 === 0) {
                    // prev -> curr (prev/2 = curr) => curr * 2 = prev
                    // 逆操作: prev = 2 * curr
                    // 逆操作: curr = prev / 2 (もし prev が偶数なら)
                    // ここでは、n から 1 への操作を逆算するのではなく、n から 1 へのパス上の各ステップの「手数」を求める必要がある。
                    // 問題の要求は「n から 1 に到達するまでの手数」なので、単純に反復計算で手数を求めるのが最も直接的。
                    // メモ化の目的は、同じ n が再登場したときに計算をスキップすること。
                    // したがって、n から 1 への手数を直接計算し、その結果をメモする。
                }
            }
            
            // 再度、n から 1 への手数を計算し、メモする
            let count = 0;
            let temp = n;
            while (temp !== 1) {
                if (temp % 2 === 0) {
                    temp /= 2;
                } else {
                    temp = 3 * temp + 1;
                }
                count++;
            }
            
            if (!memo.has(n)) {
                memo.set(n, count);
            }
            totalCount += count;

            // 経路上のすべての値にもメモ化を試みる（これは、経路上のすべての値がクエリになることを想定する）
            // ただし、この問題は「クエリ n に対して n から 1 への手数を求める」であり、
            // 経路上の各値が独立したクエリではないため、経路上の値のみをメモ化する方が効率的。
            // ここでは、n から 1 へのパス上の各値が、将来のクエリとして現れることを想定し、
            // 経路上の各値について、その値から 1 への手数を計算してメモする。
            
            // 経路上の各値について、その値から 1 への手数を計算し、メモする
            for (const val of path) {
                if (val !== 1 && !memo.has(val)) {
                    let subCount = 0;
                    let tempVal = val;
                    while (tempVal !== 1) {
                        if (tempVal % 2 === 0) {
                            tempVal /= 2;
                        } else {
                            tempVal = 3 * tempVal + 1;
                        }
                        subCount++;
                    }
                    memo.set(val, subCount);
                }
            }
        }
    }

    console.log(`total=${totalCount}`);
}

solve();
