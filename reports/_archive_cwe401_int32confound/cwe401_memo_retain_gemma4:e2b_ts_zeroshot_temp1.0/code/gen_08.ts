/**
 * 仕様を満たすプログラム
 * 処理内容：
 * 標準入力からクエリを読み込み、nが偶数ならn/2、奇数なら3n+1の操作を繰り返して1に到達するまでの手数を計算する。
 * 計算結果をメモ化して高速化する。
 * すべてのクエリの手数の合計を求める。
 * 結果は `total=<合計>` の形式で出力する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // メモ化のためのマップ
    const memo: Map<number, number> = new Map();
    let totalSteps: bigint = 0n;

    for (const line of lines) {
        const n = parseInt(line, 10);

        if (isNaN(n)) {
            continue;
        }

        // ベースケース
        if (n === 1) {
            // 1 に到達するまでの手数は 0
            const steps = 0;
            memo.set(1, steps);
            totalSteps += BigInt(steps);
            continue;
        }

        // メモ化された値の確認
        if (memo.has(n)) {
            const steps = memo.get(n)!;
            totalSteps += BigInt(steps);
            continue;
        }

        // 再帰的計算（メモ化を利用）
        let currentN = n;
        let steps = 0;
        const path: number[] = [];

        while (currentN !== 1) {
            // 既に計算済みの場合はスキップ
            if (memo.has(currentN)) {
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

        // 1 に到達したときのステップ数を計算し、パス全体をメモ化する
        // 途中の値も計算結果としてメモ化することで、同じ経路を再計算しないようにする
        let finalSteps = 0;
        let current = n;
        const memoPath: { [key: number]: number } = {};

        // 逆順に計算して、全てをメモ化する
        while (current !== 1) {
            if (memo.has(current)) {
                finalSteps += memo.get(current)!;
                break;
            }

            if (current % 2 === 0) {
                const next = current / 2;
                memoPath[current] = 1 + (memoPath[next] || 0);
                current = next;
            } else {
                const next = 3 * current + 1;
                memoPath[current] = 1 + (memoPath[next] || 0);
                current = next;
            }
        }
        
        // 最終的なステップ数を計算
        if (memoPath[n] === undefined) {
             // 通常の再帰的な計算で結果が確定しない場合のフォールバック（通常はこの問題では直接的な計算で十分）
             // 念のため、単純な再帰で計算し、結果をメモ化する
             let tempSteps = 0;
             let tempN = n;
             const stack: { n: number, steps: number }[] = [{ n: n, steps: 0 }];
             const visited = new Set<number>();
             
             while(stack.length > 0) {
                 const { n: curr, steps: s } = stack.pop()!;
                 
                 if (curr === 1) {
                     finalSteps = s;
                     break;
                 }
                 
                 if (visited.has(curr)) continue;
                 visited.add(curr);

                 if (memo.has(curr)) {
                     // メモ化があればそこから足し算で計算
                     finalSteps += memo.get(curr)!;
                     break;
                 }

                 let nextN;
                 if (curr % 2 === 0) {
                     nextN = curr / 2;
                 } else {
                     nextN = 3 * curr + 1;
                 }

                 stack.push({ n: nextN, steps: s + 1 });
             }

        }


        // 確定したステップ数を合計に追加し、メモ化する
        // ここでは、最も効率的で正しい方法として、再帰的なメモ化を再確認する。
        // 実際には、この問題は「1に到達するまでの操作回数」を求める問題であり、
        // 一般的には直接的な計算とメモ化が最もシンプルで確実です。

        // 再度、シンプルなメモ化で計算し直す
        let calculatedSteps = 0;
        let tempN_calc = n;
        const visited_calc = new Set<number>();
        
        const stack_calc: { n: number, steps: number }[] = [{ n: n, steps: 0 }];
        const visited_set: Set<number> = new Set([n]);

        while(stack_calc.length > 0) {
            const { n: curr, steps: s } = stack_calc.pop()!;
            
            if (curr === 1) {
                calculatedSteps = s;
                break;
            }
            
            let nextN;
            if (curr % 2 === 0) {
                nextN = curr / 2;
            } else {
                nextN = 3 * curr + 1;
            }

            if (memo.has(nextN)) {
                 // 既知の値があれば、それを利用して計算を終了
                 calculatedSteps = s + memo.get(nextN)!;
                 break;
            }

            if (!visited_set.has(nextN)) {
                visited_set.add(nextN);
                stack_calc.push({ n: nextN, steps: s + 1 });
            }
        }

        if (calculatedSteps > 0) {
             memo.set(n, calculatedSteps);
             totalSteps += BigInt(calculatedSteps);
        }
    }

    console.log(`total=${totalSteps.toString()}`);
}

solve();
