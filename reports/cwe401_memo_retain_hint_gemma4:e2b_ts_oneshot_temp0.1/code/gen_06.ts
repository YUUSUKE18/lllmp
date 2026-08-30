const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    if (lines.length === 0) {
        console.log("total=0");
        return;
    }

    // 1. 入力のパース
    const initialNumbers = lines.map(line => parseInt(line, 10));
    
    // 2. メモ化のためのマップ
    const memo = new Map<number, number>();
    memo.set(1, 0);

    // 3. 繰り返し操作の関数 (メモ化付き)
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current = n;
        const steps = [];
        
        // 経路を追跡し、サイクルを検出する
        const path = new Map<number, number>(); // 値 -> ステップ数
        path.set(n, 0);
        let step = 0;

        while (current !== 1) {
            if (path.has(current)) {
                // サイクル検出
                const cycleStartStep = path.get(current)!;
                const cycleLength = step - cycleStartStep;
                
                // サイクル内の移動を計算
                const remainingSteps = (steps.length - cycleStartStep) % cycleLength;
                
                // サイクル内の移動を再計算して、最終的なステップ数を求める
                // サイクル内の移動を再実行して、サイクルを抜けるまでのステップ数を計算する
                let temp = current;
                let cycleSteps = 0;
                while (temp !== 1) {
                    temp = (temp % 2 === 0) ? Math.floor(temp / 2) : 3 * temp + 1;
                    cycleSteps++;
                }
                
                // サイクルを抜けた後のステップ数を加算
                const stepsBeforeCycle = cycleStartStep;
                const stepsInCycle = cycleLength;
                
                // サイクルを抜けるために必要なステップ数
                const stepsToCycleExit = (steps.length - cycleStartStep) % cycleLength;
                
                // サイクルを抜けた後のステップ数
                const finalSteps = stepsBeforeCycle + stepsToCycleExit;
                
                memo.set(n, finalSteps);
                return finalSteps;
            }

            // 次のステップへ
            if (current % 2 === 0) {
                current = Math.floor(current / 2);
            } else {
                current = 3 * current + 1;
            }
            
            steps.push(step + 1);
            path.set(current, step + 1);
            step++;
        }

        // 1に到達した場合 (サイクルがなかった場合)
        memo.set(n, step);
        return step;
    }

    // 4. 全クエリの処理と合計の計算
    let totalSteps = 0;
    for (const n of initialNumbers) {
        if (n >= 1) {
            // 実際には、各クエリが独立しているため、memo化された結果を直接使う
            // ただし、問題文の「n が 1 のときの手数は 0」という定義に従い、
            // サイクル検出ロジックが複雑になるため、ここでは単純な再帰的/反復的な計算でメモ化を適用する。
            // サイクル検出は、この問題が「1に到達するまでの手数」を求めるため、
            // サイクル検出が必須となる（特に3n+1問題の場合）
            
            // サイクル検出を簡略化し、一般的な3n+1問題の解法（サイクル検出）を適用する。
            // サイクル検出が複雑になるため、ここではより直接的なメモ化を試みる。
            
            // サイクル検出を伴う計算を再実行する（より安全な実装）
            const result = countSteps(n);
            totalSteps += result;
        }
    }

    // 5. 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
