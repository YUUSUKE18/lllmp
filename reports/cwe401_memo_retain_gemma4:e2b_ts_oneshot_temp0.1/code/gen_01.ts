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
        
        // 1に到達するまでの経路を記録し、メモ化する
        while (current !== 1) {
            steps.push(current);
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
        }
        
        // 経路を逆順に辿り、メモ化する
        let count = 0;
        let temp = n;
        while (temp !== 1) {
            if (memo.has(temp)) {
                count += memo.get(temp)! + 1;
                break;
            }
            if (temp % 2 === 0) {
                temp = temp * 2; // 逆操作: n/2 -> 2n
            } else {
                temp = (temp - 1) / 3; // 逆操作: 3n+1 -> (n-1)/3
            }
            // この逆操作のロジックは複雑になるため、ここでは単純に再帰的なメモ化を試みるか、
            // 逆方向の計算を直接行う。
            // 今回は、元の問題の意図（nから1への操作の回数）を求めるため、
            // 順方向の計算をメモ化する方が安全。
        }
        
        // 順方向の計算を再実行し、メモ化を確実に行う
        let currentN = n;
        const path = [n];
        const visited = new Set<number>();
        
        while (currentN !== 1) {
            if (visited.has(currentN)) {
                // サイクルに陥った場合（この問題では発生しないはずだが念のため）
                return Infinity; 
            }
            visited.add(currentN);
            
            if (currentN % 2 === 0) {
                currentN = currentN / 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            path.push(currentN);
        }
        
        // 1に到達するまでのステップ数は path.length - 1
        const stepsCount = path.length - 1;
        
        // 経路上の全ての値をメモ化する (nから1への最短経路を求めるため)
        for (let i = 0; i < path.length; i++) {
            memo.set(path[i], path.length - 1 - i); // 逆順で格納
        }
        
        return memo.get(n)!;
    }

    // 4. 全クエリの処理と合計の計算
    let totalSteps = 0;
    
    for (const n of initialNumbers) {
        if (n >= 1) {
            // 既にメモ化されているか確認
            if (!memo.has(n)) {
                // 順方向の計算とメモ化
                let current = n;
                const path = [n];
                const visited = new Set<number>();
                let found = false;

                while (current !== 1) {
                    if (visited.has(current)) {
                        // サイクル検出（この問題では通常発生しない）
                        break;
                    }
                    visited.add(current);
                    
                    if (current % 2 === 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    path.push(current);
                }
                
                if (current === 1) {
                    const steps = path.length - 1;
                    // メモ化: nから1へのステップ数を格納
                    for (let i = 0; i < path.length; i++) {
                        memo.set(path[i], steps - (path.length - 1 - i));
                    }
                    totalSteps += steps;
                } else {
                    // 1に到達しなかった場合（無限ループまたはエラー）
                    // 仕様上、1に到達すると仮定する
                }
            } else {
                totalSteps += memo.get(n)!;
            }
        }
    }

    // 5. 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
