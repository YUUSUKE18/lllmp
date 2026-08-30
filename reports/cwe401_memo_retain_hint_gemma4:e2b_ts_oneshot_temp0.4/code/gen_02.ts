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

    // 1. 入力された整数をパース
    const initialNumbers = lines.map(line => parseInt(line, 10)).filter(n => !isNaN(n) && n >= 1);

    if (initialNumbers.length === 0) {
        console.log("total=0");
        return;
    }

    // 2. メモ化のためのマップ
    const memo = new Map<number, number>();
    memo.set(1, 0);

    /**
     * 置き換え操作を繰り返す手数を計算する（メモ化付き）
     * @param n 現在の数
     * @returns 1 に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 1;
        let current = n;
        
        // 1 に到達するまで繰り返す
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        // 経路上の全ての値をメモ化する（これは、元の問題の意図を解釈し、
        // 任意の数 n から 1 への最短経路ではなく、与えられた n から 1 への操作回数を求める、
        // という解釈に基づいている。ただし、この問題は通常、Collatz問題の「ステップ数」を求めるため、
        // 任意の数 n から 1 への到達を計算する）
        
        // ここでは、与えられた n から 1 への操作回数を計算する。
        // 実際には、この問題は Collatz 予想に関連しており、与えられた n から 1 へのステップ数を求める。
        // 途中の値もメモ化対象とする。
        
        // 再帰的なメモ化を導入して、より効率的に計算する
        // ただし、この問題の指示は「n が 1 に到達するまでの手数を求め」であり、
        // これは通常、Collatz数列のステップ数を指す。
        
        // 再計算ロジックを修正し、再帰的なメモ化を適用する。
        // 任意の n から 1 への到達を計算する。
        
        // 既存のロジックは、n から 1 への一方向のパスを計算しているため、
        // 途中の値が再利用されることを考慮して、再帰的なメモ化を適用する。
        
        // 簡略化のため、ここでは直接計算したステップ数を返す。
        // 任意の数 n から 1 へのステップ数を求める。
        
        // 既存のループ計算で得られたステップ数をメモ化する
        memo.set(n, steps);
        return steps;
    }

    // 3. 全クエリの処理と合計の計算
    let totalSteps = 0;
    
    for (const n of initialNumbers) {
        if (n >= 1) {
            // 既にメモ化されているか確認
            if (!memo.has(n)) {
                // 新しいクエリの場合、計算を実行
                let current = n;
                let steps = 0;
                const path = []; // 経路を記録して、途中の値もメモ化する
                
                // 経路上の値をすべてメモ化する（深さ優先探索的なメモ化）
                // ただし、これは「n から 1 への最短経路」ではなく、「n から 1 への操作回数」を求めるため、
                // 単純な反復計算で十分である。
                
                const stack: { num: number, steps: number, path: number[]} = [{ num: n, steps: 0, path: [n] }];
                const visited = new Set<number>();
                visited.add(n);
                
                let found = false;
                
                while (stack.length > 0) {
                    const { num: currentN, steps: currentSteps, path: currentPath } = stack.pop()!;

                    if (currentN === 1) {
                        totalSteps += currentSteps;
                        // 経路上の全ての値をメモ化する
                        for (const p of currentPath) {
                            memo.set(p, currentSteps - (n === p ? 0 : 1)); // 複雑になるため、ここでは単純に現在のステップ数を記録
                        }
                        found = true;
                        break;
                    }

                    let nextN: number;
                    if (currentN % 2 === 0) {
                        nextN = currentN / 2;
                    } else {
                        nextN = 3 * currentN + 1;
                    }
                    
                    if (nextN >= 1 && !visited.has(nextN)) {
                        visited.add(nextN);
                        stack.push({ num: nextN, steps: currentSteps + 1, path: [...currentPath, nextN] });
                    }
                }
                
                // 経路探索で求めた結果を合計に加算する
                // 経路探索の結果を直接合計に加算する（メモ化の整合性を保つため）
                // この問題は「各 n について、n から 1 への手数を求め、その合計を求める」と解釈する。
                // 経路探索の結果を直接合計に加算する。
                // 経路探索が完了した時点で、全ての経路上の値がメモ化される。
                
            } else {
                // 既に計算済みの場合はメモ化された値を加算
                totalSteps += memo.get(n)!;
            }
        }
    }

    // 最終的な合計を出力
    console.log(`total=${totalSteps}`);
}

solve();
