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

    // 最初の行がクエリの数（または最初の値）であると仮定し、残りをクエリとして扱う
    // 問題文の記述から、標準入力全体がクエリの列であると解釈し、1行ずつ処理する
    
    let total_steps = 0;
    const memo = new Map<number, number>();

    for (const line of lines) {
        const n = parseInt(line, 10);
        
        if (isNaN(n)) {
            continue; // 整数として解釈できない行は無視
        }

        if (n === 1) {
            // nが1のときの手数は0
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            total_steps += memo.get(n);
            continue;
        }

        // 再帰的または反復的に計算し、メモ化する
        let current_n = n;
        let steps = 0;
        const path = new Set<number>(); // サイクル検出用

        while (current_n !== 1) {
            if (path.has(current_n)) {
                // サイクルに陥った場合、この経路は無限ループになる可能性があるが、
                // 問題の性質上、1に到達する経路が保証されているため、
                // サイクル検出は厳密には不要かもしれないが、安全のため。
                // ただし、この問題はCollatz予想に関連しており、1に収束することが期待される。
                // サイクル検出は、計算が非常に長くなるのを防ぐためのメモ化の補助として使う。
                // ここでは、単純に計算を続ける。
                break; 
            }
            
            path.add(current_n);

            if (current_n % 2 === 0) {
                current_n /= 2;
            } else {
                current_n = 3 * current_n + 1;
            }
            steps++;
        }
        
        // 1に到達したか、または計算が終了した後のステップ数を加算
        if (current_n === 1) {
            // 1に到達するまでの手数を加算
            total_steps += steps;
            // 経路上のすべての値についてメモ化（より効率的）
            let temp_n = n;
            let temp_steps = 0;
            while (temp_n !== 1) {
                if (memo.has(temp_n)) {
                    // 既に計算済みの部分があれば、その結果を足し合わせる
                    // このアプローチは、元のnから1までの経路を再計算するよりも複雑になるため、
                    // 単純にnから1までの経路を計算し、その結果をメモ化する方が安全。
                }
                
                if (temp_n === 1) break;

                if (memo.has(temp_n)) {
                    // 既に計算済みの値があれば、その結果を足し合わせる
                    // この問題は「nから1に到達するまでの手数」を求めるため、
                    // nから1までの経路を辿りながら、各ステップのコストを累積する。
                    // したがって、再帰的なメモ化（DP）が最も適切。
                }
                
                // 再帰的なメモ化（DP）に切り替える
                // ここでは、再帰的なメモ化を導入する。
            }
        }
    }
    
    // --- 再帰的なメモ化（DP）による再実装 ---
    
    const memo_dp = new Map<number, number>();

    function calculate_steps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo_dp.has(n)) {
            return memo_dp.get(n)!;
        }

        let steps = 0;
        let current_n = n;
        const path = new Set<number>(); // サイクル検出用

        while (current_n !== 1) {
            if (path.has(current_n)) {
                // サイクル検出。この問題では通常発生しないが、念のため。
                // サイクル内の要素は、1に到達しないため、この経路は無効と見なすか、エラーとする。
                // Collatz予想に基づけば、1に収束すると仮定する。
                // サイクル内の要素が1に到達しない場合、この計算は破綻する。
                // ここでは、サイクルに陥った場合は、その経路を終了させる（実質的に無限ループを避ける）。
                // ただし、問題の制約上、これは発生しないはず。
                // サイクル検出は、計算が非常に長くなるのを防ぐためのメモ化の補助としてのみ使用する。
                break; 
            }
            
            path.add(current_n);

            if (current_n % 2 === 0) {
                current_n /= 2;
            } else {
                current_n = 3 * current_n + 1;
            }
            steps++;
        }

        // 1に到達したかどうかのチェック（サイクル検出が機能した場合）
        if (current_n === 1) {
            const result = steps;
            // 経路上のすべての値についてメモ化（DP）
            let temp_n = n;
            let temp_steps = 0;
            while (temp_n !== 1) {
                if (memo_dp.has(temp_n)) {
                    // 既に計算済みの値があれば、その結果を足し合わせる
                    temp_steps += memo_dp.get(temp_n)!;
                } else {
                    // 再帰的に計算し、結果をメモ化
                    const sub_steps = calculate_steps(temp_n);
                    memo_dp.set(temp_n, sub_steps);
                    temp_steps += sub_steps;
                }
                
                if (temp_n === 1) break;

                if (temp_n % 2 === 0) {
                    temp_n /= 2;
                } else {
                    temp_n = 3 * temp_n + 1;
                }
                temp_steps++;
            }
            
            // 最終的な結果をメモ化
            memo_dp.set(n, temp_steps);
            return temp_steps;
        }
        
        // 1に到達しなかった場合（サイクルなど）、エラーまたは特別な値。
        // 問題の文脈上、これは発生しないと仮定する。
        // 念のため、ここでは計算されたステップ数を返す。
        return steps; 
    }

    // 最終的な合計を計算
    let final_total = 0;
    for (const line of lines) {
        const n = parseInt(line, 10);
        if (!isNaN(n)) {
            if (n === 1) {
                // n=1の場合は手数は0
                continue;
            }
            
            // DPで計算された結果を使用
            const steps = calculate_steps(n);
            final_total += steps;
        }
    }

    console.log(`total=${final_total}`);
}

solve();
