/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力からクエリを読み込み、特定の操作を繰り返して 1 に到達するまでの手数を求め、その合計を計算する。
 * 操作:
 * - n が偶数なら n/2
 * - n が奇数なら 3n+1
 * - n=1 のときの手数は 0。
 * メモ化を使用して高速化する。
 * 結果は `total=<合計>` の形式で出力する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    let totalSteps = 0n; // 64bit整数として扱うため BigInt を使用
    const memo = new Map<number, number>();

    for (const line of lines) {
        const n = parseInt(line, 10);
        
        if (isNaN(n) || n < 1) {
            continue; // 整数として解釈できない行や 1 未満の値を無視
        }

        if (n === 1) {
            // n=1 のときの手数は 0
            // memo.set(1, 0); // 1 の場合は計算不要だが、念のため
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            const steps = memo.get(n)!;
            totalSteps += BigInt(steps);
            continue;
        }

        // 再帰的または反復的に計算し、メモ化する
        let currentN = n;
        let steps = 0;
        const path: number[] = []; // 経路を記録して、途中の計算をメモ化するために使用

        while (currentN !== 1) {
            if (memo.has(currentN)) {
                // 既にメモがあれば、その結果を現在のステップに加算して終了
                steps += memo.get(currentN)!;
                break;
            }
            
            path.push(currentN);

            if (currentN % 2 === 0) {
                currentN /= 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            steps++;
        }
        
        // 1 に到達した後のステップ数を計算し、経路を遡ってメモ化する
        // 1 に到達したときのステップ数は、現在のステップ数 (steps) + 1 (最後の移動) ではない。
        // ここで求めたいのは「1 に到達するまでの手数」なので、操作の回数を数える。
        
        // 再計算して、経路上の各ステップのメモ化を確実に行う
        let finalSteps = 0;
        let tempN = n;
        const history: number[] = [];
        
        while (tempN !== 1) {
            history.push(tempN);
            if (tempN % 2 === 0) {
                tempN /= 2;
            } else {
                tempN = 3 * tempN + 1;
            }
            finalSteps++;
        }
        
        // 1 に到達するまでの手数は finalSteps
        // 経路上の各値について、そこから1に到達する手数をメモ化する
        
        // 経路を逆順に処理してメモ化する (DP的なアプローチ)
        let currentMemoSteps = 0;
        for (let i = history.length - 1; i >= 0; i--) {
            const val = history[i];
            if (val === 1) {
                memo.set(val, 0);
            } else if (memo.has(val)) {
                // 既に計算済み
                // currentMemoSteps = memo.get(val)! + 1; // これは誤り。nから1への手数を求めるため、nの操作回数を数える。
            } else {
                // 次のステップのメモ化を待つ必要があるため、この単純なDPは難しい。
                // 質問は「nから1に到達するまでの手数」なので、単に反復計算で求めるのが最も直接的。
            }
        }
        
        // 最も単純なアプローチ：クエリごとに直接計算し、メモ化する
        let calculatedSteps = 0;
        let tempN_calc = n;
        
        // 1 に到達するまでの操作回数を数える
        while (tempN_calc !== 1) {
            if (memo.has(tempN_calc)) {
                // 既に計算済みの場合、その結果を足し合わせる
                calculatedSteps += memo.get(tempN_calc)!;
                break;
            }

            if (tempN_calc % 2 === 0) {
                tempN_calc /= 2;
            } else {
                tempN_calc = 3 * tempN_calc + 1;
            }
            calculatedSteps++;
        }
        
        // 1 に到達したときのステップ数をメモ化
        memo.set(n, calculatedSteps);
        totalSteps += BigInt(calculatedSteps);
    }

    console.log(`total=${totalSteps.toString()}`);
}

solve();
