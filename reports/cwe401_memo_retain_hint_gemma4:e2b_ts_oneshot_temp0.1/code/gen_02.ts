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
        const path = new Map<number, number>(); // 値 -> ステップ数
        path.set(n, 0);
        
        let step = 0;
        let cycleDetected = false;
        
        while (current !== 1) {
            if (path.has(current)) {
                // サイクル検出
                const cycleStartStep = path.get(current)!;
                const cycleLength = step - cycleStartStep;
                
                // サイクル内のステップ数を計算
                const stepsInCycle = steps.length;
                const stepsBeforeCycle = cycleStartStep;
                
                // サイクルをスキップして、1に到達するまでのステップ数を計算
                const remainingSteps = (step - cycleStartStep) % cycleLength;
                
                // サイクルを抜けた後のステップ数を計算
                const stepsTo1 = stepsBeforeCycle + remainingSteps;
                
                // サイクル内のステップ数を再計算して、その後のステップ数を計算
                // サイクル内のステップ数を計算し直す必要があるが、ここでは単純化のため、
                // サイクル検出時に、サイクル内の移動を考慮して再計算する。
                
                // より簡単なアプローチ: サイクル内の移動を直接計算する
                // サイクル内の移動を計算し、その後の移動を計算する
                
                // サイクル内の移動を計算し直す
                const cycleValues = [];
                let temp = n;
                let cycleIndex = 0;
                while (temp !== 1) {
                    cycleValues.push(temp);
                    temp = (temp % 2 === 0) ? temp / 2 : 3 * temp + 1;
                    cycleIndex++;
                }
                
                // サイクル検出時の再計算は複雑になるため、ここでは単純に、
                // サイクルが見つかった時点で、そのサイクル内の移動を考慮して、
                // 1に到達するまでのステップ数を計算する。
                
                // サイクル検出時の再計算ロジックを簡略化し、
                // サイクル内の移動を考慮して、1に到達するまでのステップ数を計算する。
                
                // サイクル検出時に、現在の値がサイクルに含まれている場合、
                // サイクル内の移動を計算し、そこから1への移動を計算する。
                
                // サイクル検出時の再計算（より厳密な方法）
                const cyclePath = [];
                let currentCycleStart = n;
                let cycleStep = 0;
                
                // サイクルを辿る
                while (true) {
                    cyclePath.push(currentCycleStart);
                    currentCycleStart = (currentCycleStart % 2 === 0) ? currentCycleStart / 2 : 3 * currentCycleStart + 1;
                    cycleStep++;
                    if (currentCycleStart === 1) break;
                }
                
                // サイクル内のステップ数を計算
                const cycleLengthActual = cyclePath.length - 1; // 1から始まるため、最後の要素は1
                
                // 1に到達するまでのステップ数を計算
                let stepsTo1Final = 0;
                
                // サイクルに入る前のステップ
                let preCycleSteps = 0;
                let tempN = n;
                while (tempN !== cyclePath[0]) {
                    tempN = (tempN % 2 === 0) ? tempN / 2 : 3 * tempN + 1;
                    preCycleSteps++;
                }
                
                // サイクル内の移動
                const indexInCycle = cyclePath.indexOf(n);
                const stepsInCyclePath = cyclePath.length - 1; // 1から始まるため、長さは要素数-1
                
                // 1に到達するまでのステップ数を計算
                // サイクルに入る前のステップ数 + サイクル内の移動数
                const stepsTo1Result = preCycleSteps + (stepsInCyclePath - indexInCycle);
                
                memo.set(n, stepsTo1Result);
                return stepsTo1Result;
            }
            
            path.set(current, step);
            current = (current % 2 === 0) ? current / 2 : 3 * current + 1;
            step++;
        }

        // サイクルが検出されずに1に到達した場合
        memo.set(n, step);
        return step;
    }

    // 4. 全クエリの処理と合計の計算
    let totalSteps = 0;
    for (const n of initialNumbers) {
        if (n >= 1) {
            totalSteps += countSteps(n);
        }
    }

    // 5. 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
