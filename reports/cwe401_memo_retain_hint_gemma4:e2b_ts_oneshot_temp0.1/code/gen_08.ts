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
        
        // 経路を記録して、サイクルを検出する
        while (current !== 1) {
            steps.push(current);
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
        }
        
        // 1に到達するまでのステップ数を計算
        let count = steps.length;
        
        // サイクル検出とメモ化の更新
        // 経路を逆順に見て、サイクルを検出する
        const path = [...steps].reverse();
        const visited = new Map<number, number>(); // 値 -> インデックス (ステップ数)
        let cycleStart = -1;
        let cycleLength = 0;

        for (let i = 0; i < path.length; i++) {
            const val = path[i];
            if (visited.has(val)) {
                cycleStart = visited.get(val)!;
                cycleLength = i - cycleStart;
                break;
            }
            visited.set(val, i);
        }

        if (cycleStart !== -1) {
            // サイクルが見つかった場合、サイクル内のステップ数を計算
            const stepsBeforeCycle = cycleStart;
            const stepsInCycle = cycleLength;
            
            // 1に到達するまでのステップ数を計算
            // サイクルに入る前のステップ数 (path[cycleStart] がサイクル開始)
            // 1に到達するまでのステップ数は、サイクルに入る前のステップ数 + サイクル内のステップ数 * (k回繰り返す)
            
            // ここでは、1に到達するまでの「手数」を求めるため、
            // サイクルをスキップして1に到達するまでのステップ数を計算する。
            
            // 1に到達するまでのステップ数を再計算する（より安全な方法）
            let temp = n;
            let count_final = 0;
            const history = new Map<number, number>(); // 値 -> ステップ数
            history.set(n, 0);
            
            while (temp !== 1) {
                if (history.has(temp)) {
                    // サイクル検出
                    const startStep = history.get(temp)!;
                    const cycleLen = count_final - startStep;
                    
                    // 1に到達するまでの残りステップ数を計算
                    const remainingSteps = (count_final - startStep) % cycleLen;
                    
                    // 1に到達するまでの総ステップ数
                    const stepsTo1 = count_final - startStep + remainingSteps;
                    
                    memo.set(n, stepsTo1);
                    return stepsTo1;
                }
                
                count_final++;
                if (count_final > 1000000) { // 安全策：無限ループ防止（実質的にはサイクル検出で防ぐべきだが念のため）
                    // このケースは通常発生しないはずだが、念のため
                    break;
                }
                
                if (temp % 2 === 0) {
                    temp = temp / 2;
                } else {
                    temp = 3 * temp + 1;
                }
                history.set(temp, count_final);
            }
            
            // サイクル検出がうまくいかなかった場合（通常は到達しない）
            memo.set(n, count_final);
            return count_final;

        } else {
            // サイクルが見つからなかった場合（1に到達した）
            memo.set(n, count);
            return count;
        }
    }

    // 4. 全クエリの処理と合計の計算
    let totalSteps = 0;
    
    for (const n of initialNumbers) {
        if (n >= 1) {
            // 念のため、クエリごとに計算を試みる。
            // 実際には、memo化された値が入力に含まれることを期待する。
            const steps = countSteps(n);
            totalSteps += steps;
        }
    }

    // 5. 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
