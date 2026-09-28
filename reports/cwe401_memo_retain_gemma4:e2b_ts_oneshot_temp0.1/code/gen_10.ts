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

    // 1から始まる整数列を読み込む
    const queries = lines.map(line => parseInt(line, 10)).filter(n => !isNaN(n) && n >= 1);

    // メモ化テーブル
    const memo = new Map<number, number>();
    memo.set(1, 0);

    /**
     * 置き換え操作を繰り返し、1に到達するまでの手数を計算する
     * @param n 初期値
     * @returns 1に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current = n;
        let steps = 0;
        const history = new Set<number>();

        while (current !== 1) {
            if (history.has(current)) {
                // サイクルに陥った場合、この経路は無限ループになる可能性があるが、
                // この問題の操作 (n/2 or 3n+1) は通常、1に収束するため、
                // サイクル検出は厳密には不要だが、安全のため。
                // ただし、この問題の操作はCollatz予想に関連しており、1に収束することが期待される。
                // サイクル検出は、計算が非常に長くなるのを防ぐためのメモ化の補助として機能する。
                // ここでは、単純に計算を続けることに焦点を当てる。
            }
            
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // 経路上のすべての値をメモ化する（再帰的なメモ化の代わりに、直接計算結果を記録する）
        // ただし、この問題は「各クエリ n について、n が 1 に到達するまでの手数を求める」なので、
        // 1からnまでの経路を計算するのではなく、nから1への経路を計算する。
        // サイクル検出とメモ化を組み合わせる。
        
        // 再帰的なメモ化を試みる（より標準的なメモ化手法）
        // ただし、この問題は「nから1への経路」を求めるため、再帰的なメモ化は逆方向の計算になる。
        // ここでは、直接計算とメモ化を組み合わせる。
        
        // 経路を記録し、到達した値が既に計算済みか確認する
        const path: number[] = [n];
        let temp = n;
        let stepCount = 0;
        
        // 経路を辿り、サイクルを検出する
        const visited = new Map<number, number>(); // 値 -> ステップ数
        visited.set(n, 0);
        
        let current_val = n;
        let current_steps = 0;
        
        while (current_val !== 1) {
            if (visited.has(current_val)) {
                // サイクル検出。この問題の操作では、1に収束しないサイクルは通常発生しないが、
                // 念のため、もしサイクルに入ったら、その経路は計算不能（または無限）と見なす。
                // ここでは、サイクルに入った場合は、その経路のステップ数を返す（ただし、これは問題の意図と異なる可能性がある）。
                // Collatz問題では、1に収束することが前提。
                // サイクル検出は、計算が爆発するのを防ぐためのメモ化として利用する。
                break; 
            }
            
            if (current_val % 2 === 0) {
                current_val /= 2;
            } else {
                current_val = 3 * current_val + 1;
            }
            current_steps++;
            visited.set(current_val, current_steps);
        }
        
        // 1に到達したか確認
        if (current_val === 1) {
            // 1に到達したときのステップ数を返す
            // 実際には、このwhileループの終了条件が「1に到達した」ことを保証する必要がある。
            // 1に到達した時点で、visitedマップに記録されているステップ数が答えとなる。
            return visited.get(1) ?? 0;
        }
        
        // 1に到達しなかった場合（サイクルに入った場合）、この経路は計算不能。
        // 問題の制約から、これは発生しないと仮定する。
        // 厳密には、この関数は「1に到達するまでの手数」を返す必要がある。
        // サイクル検出を導入したため、もし1に到達しなければ、それは計算エラーまたは無限ループを示す。
        // Collatz問題では、通常、1に収束すると仮定されるため、ここでは1に到達したと見なす。
        
        // 簡略化のため、再帰的なメモ化をメインとし、サイクル検出は不要と判断する（Collatz問題の性質）。
        // サイクル検出を無視し、純粋にメモ化を適用する。
        
        // 再度、純粋なメモ化（再帰的）で実装する。
        return calculateMemoized(n);
    }

    // 再帰的なメモ化関数
    function calculateMemoized(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let next_n: number;
        if (n % 2 === 0) {
            next_n = n / 2;
        } else {
            next_n = 3 * n + 1;
        }

        // 再帰呼び出し
        const steps = 1 + calculateMemoized(next_n);
        
        // メモ化
        memo.set(n, steps);
        return steps;
    }

    let total_steps = 0;

    for (const n of queries) {
        // 各クエリに対して計算を実行し、メモ化を利用する
        const steps = calculateMemoized(n);
        total_steps += steps;
    }

    // 結果の出力
    console.log(`total=${total_steps}`);
}

solve();
