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

    let totalSteps = 0;
    const memo = new Map<number, number>();

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n) || n < 1) continue;

        if (n === 1) {
            // 1に到達するまでの手数は0
            // memo.set(1, 0); // 既に0なので不要
        } else if (!memo.has(n)) {
            let current = n;
            let steps = 0;
            const history = new Set<number>(); // サイクル検出用

            while (current !== 1 && !history.has(current)) {
                if (current === 1) break; // 既に1に到達した場合はループを抜ける
                
                history.add(current);
                
                if (current % 2 === 0) {
                    current = current / 2;
                } else {
                    current = 3 * current + 1;
                }
                steps++;
            }
            
            if (current === 1) {
                // 1に到達するまでの手数は steps + 1 (最後のステップで1になった場合) 
                // または、問題の定義に従い、操作の回数を数える。
                // n=1の手数は0。n=2 -> 1 (1回)
                // n=3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7回)
                // ここでは、nから1に到達するまでの操作回数を数える。
                // n=1の場合は0。
                
                // サイクル検出を考慮し、nが1に到達するまでの操作回数を記録する。
                // サイクルに陥った場合は、そのサイクル内での操作回数を加算する。
                
                let finalSteps = 0;
                let temp = n;
                let count = 0;
                const visited = new Map<number, number>(); // 訪問した値と、その時のステップ数を記録

                while (temp !== 1) {
                    if (visited.has(temp)) {
                        // サイクル検出
                        const cycleStartStep = visited.get(temp)!;
                        const cycleLength = count - cycleStartStep;
                        
                        // サイクル内の移動回数を計算
                        const remainingSteps = (n - temp) / cycleLength; // これは複雑なので、単純にサイクル内の回数を加算する
                        
                        // サイクル内で到達する回数を計算
                        const stepsInCycle = count - cycleStartStep;
                        
                        // ここでは、サイクル内の操作回数を単純に加算する
                        finalSteps += stepsInCycle;
                        temp = 1; // サイクルを抜けたと仮定
                        break;
                    }
                    
                    visited.set(temp, count);
                    
                    if (temp % 2 === 0) {
                        temp = temp / 2;
                    } else {
                        temp = 3 * temp + 1;
                    }
                    count++;
                }
                
                if (temp === 1) {
                    // 1に到達した場合のステップ数
                    totalSteps += count;
                    memo.set(n, count);
                } else {
                    // サイクル検出後の処理（ここでは、単純なサイクル検出とメモ化に絞り、フィボナッチ操作の性質を利用する）
                    // サイクル検出は非常に複雑になるため、今回はメモ化のみに焦点を当て、サイクルが問題にならないと仮定する。
                    // サイクルが問題になる場合は、サイクル内の操作回数を別途計算する必要がある。
                    
                    // 簡略化のため、ここでは単純なメモ化を採用する。
                    totalSteps += count;
                    memo.set(n, count);
                }

            } else {
                // 1に到達しなかった場合（上記ロジックで処理されたと仮定）
                totalSteps += steps;
                memo.set(n, steps);
            }
        } else {
            // メモ化された値を使用
            totalSteps += memo.get(n)!;
        }
    }

    // サイクル検出を無視し、単純なメモ化と合計を計算する（問題の制約から、サイクルが非常に長い場合は、再帰的なメモ化が望ましいが、ここではイテレーションで代用する）
    // 実際のハミルトン問題の解法では、サイクル検出とメモ化が必須。
    // ここでは、最も単純なメモ化を適用する。
    
    // 再計算（メモ化を適用した後の合計）
    let finalTotal = 0;
    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n) || n < 1) continue;
        
        if (!memo.has(n)) {
            let current = n;
            let steps = 0;
            
            // サイクル検出付きのメモ化
            const visited = new Map<number, number>();
            const history = new Set<number>();

            while (current !== 1 && !history.has(current)) {
                if (current === 1) break;
                
                history.add(current);
                visited.set(current, steps);
                
                if (current % 2 === 0) {
                    current = current / 2;
                } else {
                    current = 3 * current + 1;
                }
                steps++;
            }

            if (current === 1) {
                // 1に到達
                memo.set(n, steps);
            } else if (visited.has(current)) {
                // サイクルに陥った (currentは既にvisitedに含まれている)
                const cycleStartStep = visited.get(current)!;
                const cycleLength = steps - cycleStartStep;
                
                // nからサイクルに入った後のステップ数
                const stepsToCycle = steps - cycleStartStep;
                
                // サイクル内の操作回数を計算して、合計に加算
                const stepsInCycle = cycleLength;

                // 1に到達するまでの総ステップ数
                const finalSteps = stepsToCycle + (1 - current) / cycleLength; // この計算は複雑すぎるため、今回は単純にサイクル長を適用して計算する
                
                // サイクル内の操作を考慮した総ステップ数を計算する（再帰的メモ化が必要）
                // 簡略化のため、ここではサイクルが問題にならないと仮定し、メモ化された値を使う。
                // サイクルが問題になる場合、再帰的メモ化が最も安全。
                
                // サイクルが発見された場合、そのサイクル内の操作回数を加算する。
                const stepsToTarget = stepsToCycle + (1 - current); // 1に到達するための追加ステップ
                memo.set(n, stepsToTarget);
            } else {
                // 1に到達しなかったが、サイクルも検出されなかった（これはありえないはず）
                memo.set(n, steps);
            }
        }
        
        if (memo.has(n)) {
            finalTotal += memo.get(n)!;
        }
    }


    console.log(`total=${finalTotal}`);
}

solve();
