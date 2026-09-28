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
            // nが1のときの手数は0
            if (!memo.has(1)) {
                memo.set(1, 0);
            }
            // このクエリに対する手数は0
            // totalCount += 0;
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            // totalCount += memo.get(n);
            continue;
        }

        // 再帰的または反復的に計算
        let steps = 0;
        let currentN = n;
        const path: number[] = []; // 経路を記録してメモ化に利用する

        while (currentN !== 1) {
            if (memo.has(currentN)) {
                // 途中でメモ化された値に到達した場合
                steps += memo.get(currentN);
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

        // 1に到達したときのステップ数を計算し、経路を遡ってメモ化する
        let finalSteps = 0;
        let tempN = n;
        
        // 経路を逆順に処理して、各ステップでの手数を計算し、メモ化する
        // ただし、この問題は「nから1に到達するまでの手数」を求めるため、
        // 経路を記録するのではなく、直接再帰的に計算し、中間結果をメモ化するのが最も効率的。
        
        // 再帰的なメモ化 (DP) を使用して計算し直す
        const calculateSteps = (num: number): number => {
            if (num === 1) {
                return 0;
            }
            if (memo.has(num)) {
                return memo.get(num)!;
            }

            let result: number;
            if (num % 2 === 0) {
                result = 1 + calculateSteps(num / 2);
            } else {
                result = 1 + calculateSteps(3 * num + 1);
            }

            memo.set(num, result);
            return result;
        };

        const stepsForN = calculateSteps(n);
        totalCount += stepsForN;
    }

    // 最終結果の出力
    console.log(`total=${totalCount}`);
}

solve();
