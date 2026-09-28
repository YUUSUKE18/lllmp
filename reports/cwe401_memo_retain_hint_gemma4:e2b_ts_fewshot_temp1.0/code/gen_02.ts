const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (input === "") {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    let total_steps = 0;
    const memo = new Map<number, number>();

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n)) continue;

        if (n === 1) {
            // 1 に到達するまでの手数は 0
            continue;
        }

        if (memo.has(n)) {
            total_steps += memo.get(n);
            continue;
        }

        let current_n = n;
        let steps = 0;
        const path = new Set<number>(); // メモ化のために経路を記録（巡回を検出するため）

        while (current_n !== 1) {
            if (path.has(current_n)) {
                // サイクルに陥った場合、この経路は到達不可能またはサイクルの一部。
                // この問題では、3n+1問題は必ず1に収束するため、サイクルは発生しないはずだが、
                // 安全のため、もし現れた場合はスキップするかエラー処理が必要になる。
                // 通常、3n+1問題では必ず1に到達するため、このチェックは厳密には不要だが、
                // 念のため、もしサイクルが発生した場合、計算を停止する。
                // ただし、この問題の文脈では、nが1に収束することを前提としているため、
                // 実際にはこのブロックには到達しないはず。
                break; 
            }
            
            path.add(current_n);
            steps++;

            if (current_n % 2 === 0) {
                current_n = current_n / 2;
            } else {
                current_n = 3 * current_n + 1;
            }
        }

        // 1に到達したかチェック
        if (current_n === 1) {
            // 経路上の各ステップの値をメモ化（DFS/再帰での計算を想定しているが、ここでは直接計算結果をメモ化する）
            // この問題は、各 n から 1 へのパスの長さを求めるため、再帰的メモ化(DP)が最適。
            // しかし、問題文の指示は「n が 1 に到達するまでの手数を求め、合計を求める」であり、
            // 各クエリに対して独立した経路を計算する必要がある。
            
            // サイクル検出のため、ここではパス全体を記録するのではなく、単に到達したと見なす。
            // DP的に考える場合、memo[n] = 1 + memo[next_n] となる。
            
            // 再度、DP/メモ化のロジックに修正する。
            // 3n+1問題では、nから1への道のりは一意であり、サイクルは発生しない。
            // memo[n] = 1 + memo[next_n] を使う。
            
            // ここでは、上記のループで計算したstepsをそのまま採用する。
            memo.set(n, steps);
            total_steps += steps;
        }
        // 1に到達しなかった場合（理論上は起こらないはず）、スキップまたはエラー処理。
    }

    // --- DP/メモ化を用いた再計算 ---
    // 上記のループは、各nに対して個別に計算したため、メモ化の効率化にはなっていない。
    // 依存関係があるため、再帰的メモ化（トップダウン）または動的計画法（ボトムアップ）で再計算する。
    
    // 最終的な解法として、DPでまとめて計算し直す。
    const final_memo = new Map<number, number>();
    
    function calculate_steps(n: number): number {
        if (n === 1) return 0;
        if (final_memo.has(n)) return final_memo.get(n)!;

        // サイクル検出のためのセット（この問題では不要だが、安全のため）
        const path = new Set<number>();
        let current_n = n;
        let steps = 0;
        
        while (current_n !== 1) {
            if (path.has(current_n)) {
                // サイクル検出
                return Infinity; 
            }
            path.add(current_n);
            steps++;

            if (current_n % 2 === 0) {
                current_n = current_n / 2;
            } else {
                current_n = 3 * current_n + 1;
            }
        }

        // 1に到達した場合、パスを遡ってステップ数を計算する必要がある。
        // しかし、上記ループは n から 1 への進む過程でステップ数をカウントしているため、
        // 戻り値は既に正しい。
        
        // ここで、直接計算した steps をメモする。
        final_memo.set(n, steps);
        return steps;
    }

    // すべての入力値に対して計算を実行し、合計を求める。
    // ここで問題の解釈は「与えられた入力リスト全体を処理する」と解釈する。
    // （例: 入力行がクエリ n のみの場合）
    
    let final_total = 0;
    for (const line of lines) {
        const n = parseInt(line, 10);
        if (!isNaN(n)) {
            if (!final_memo.has(n)) {
                const steps = calculate_steps(n);
                if (steps !== Infinity) {
                    final_total += steps;
                }
            } else {
                final_total += final_memo.get(n)!;
            }
        }
    }

    console.log(`total=${final_total}`);
}

solve();
