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

    // メモ化のためのマップ
    const memo: Map<number, number> = new Map();
    let total_steps = 0;

    for (const line of lines) {
        const n = parseInt(line, 10);
        
        if (isNaN(n) || n < 1) {
            continue;
        }

        if (n === 1) {
            // 1 に到達するまでの手数は 0
            const steps = 0;
            total_steps += steps;
            // 1 は既にメモされている（または計算済み）
            memo.set(1, 0);
            continue;
        }

        // 再帰的または反復的に計算し、メモ化を利用する
        let current_n = n;
        let steps = 0;
        const path: number[] = []; // 経路を記録してメモ化を効率的に行うため

        while (current_n !== 1) {
            if (memo.has(current_n)) {
                steps += memo.get(current_n);
                break;
            }
            
            path.push(current_n);
            
            if (current_n % 2 === 0) {
                current_n /= 2;
            } else {
                current_n = 3 * current_n + 1;
            }
            steps++;
        }
        
        // 1 に到達したときのステップ数を計算し、経路を遡ってメモ化する
        if (current_n === 1) {
            const steps_to_one = steps;
            
            // 経路を逆順に処理してメモ化する
            for (let i = path.length - 1; i >= 0; i--) {
                const val = path[i];
                // val から 1 に到達するまでのステップ数を計算し、現在のステップ数に加算する
                // ここでは、現在の計算で求めた steps_to_one を利用して、val から 1 へのステップ数を計算する
                
                // 簡略化のため、再帰的なメモ化（またはDP）を適用する方が安全だが、
                // 今回は「n から 1 への最短経路」を求めるため、現在の計算結果を直接利用する。
                
                // 再計算してメモ化する（より安全なDPアプローチ）
                // 実際には、n から 1 への経路を辿る過程で、すでに計算済みの値があればそれを利用する。
                
                // ここでは、n から 1 への経路を辿る際に、既に計算済みの値があればそれを加算する。
                // 経路を辿る過程で、もし途中の値がメモにあれば、そのメモ値に現在のステップ数を足して終了。
                
                // 再度、より標準的なメモ化（DP）で実装する。
                // 経路追跡は複雑になるため、DPテーブル全体で管理する。
            }
            
            // DPテーブルとして、n から 1 への最短経路を計算する
            // 既に計算済みの値があればそれを参照する
            
            // 簡略化のため、再帰的なメモ化で再実装する。
        }
    }
    
    // --- DP/メモ化による再実装 ---

    const memo_dp: Map<number, number> = new Map();
    let final_total_steps = 0;

    function calculate_steps(n: number): number {
        if (n === 1) return 0;
        if (memo_dp.has(n)) return memo_dp.get(n)!;

        // 経路を追跡し、メモ化を効率的に行うために、再帰的に計算する
        // ただし、この問題は「n から 1 への最短経路」なので、下方向への計算が自然。
        
        // 経路追跡を伴うDP
        const path: number[] = [];
        let current = n;
        
        // 経路を辿り、既に計算済みの値があればそれを利用する
        while (current !== 1) {
            if (memo_dp.has(current)) {
                // 既に計算済みの値があれば、その値に現在のステップ数を加算して終了
                const steps_from_current = memo_dp.get(current)!;
                const steps_to_one = path.length + steps_from_current;
                
                // 経路を遡って、現在のパス上のすべての値に結果を書き込む
                for (let i = path.length - 1; i >= 0; i--) {
                    memo_dp.set(path[i], memo_dp.get(path[i])! + (path.length - i)); // このロジックは複雑すぎる。
                }
                
                // 単純に、現在のnから1へのステップ数を計算し、結果を返す
                const steps_to_one = path.length + memo_dp.get(current)!;
                
                // 経路を記録し、結果を返す
                memo_dp.set(n, steps_to_one);
                return steps_to_one;
            }
            
            path.push(current);
            
            if (current % 2 === 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
        }
        
        // ループ終了時 (n=1に到達した場合)
        memo_dp.set(n, path.length);
        return path.length;
    }

    // 最終的な合計を計算
    for (const line of lines) {
        const n = parseInt(line, 10);
        if (!isNaN(n) && n >= 1) {
            const steps = calculate_steps(n);
            final_total_steps += steps;
        }
    }

    console.log(`total=${final_total_steps}`);
}

solve();
