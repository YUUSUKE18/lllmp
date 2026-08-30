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
    const memo = new Map<number, number>();
    let total_steps = 0;

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n) || n < 1) continue;

        if (n === 1) {
            // nが1のときの手数は0
            continue;
        }

        if (memo.has(n)) {
            // メモがあればスキップ
            continue;
        }

        let current_n = n;
        let steps = 0;
        const path = new Set<number>(); // サイクル検出用

        while (current_n !== 1) {
            if (path.has(current_n)) {
                // サイクルに陥った場合、このパスは計算しない（ただし、この問題の操作は必ず1に収束するため、通常は発生しないはずだが安全策として）
                break;
            }
            
            path.add(current_n);

            if (current_n % 2 === 0) {
                current_n = current_n / 2;
            } else {
                current_n = 3 * current_n + 1;
            }
            steps++;
        }
        
        // 1に到達したか、またはサイクルに陥ったかを確認
        if (current_n === 1) {
            // 1に到達したときのステップ数を記録
            // ここで、元のnから1に到達するまでのステップ数を計算し直す必要がある。
            // 実際には、メモ化をより効率的に行うために、再帰的な構造や、到達時のステップ数を保持する方が良いが、
            // 仕様に従い、nから1への到達ステップ数を求める。
            
            // サイクル検出をより厳密に行うため、ここでは直接再帰的なメモ化（または動的計画法）を適用する。
            // サイクル検出は、同じ値が再出現した場合に、その時点で計算を打ち切るためのもの。
            // 今回の操作は通常、1に収束するため、サイクル検出は必須ではないが、メモ化のために行う。
            
            // 再計算せずに、現在のパスで求めたステップ数を採用する。
            // ただし、このwhileループは「nから1に到達するまでの操作回数」を求めている。
            
            // サイクル検出を無視し、単純にステップ数を加算する（メモ化が主目的のため）。
            // サイクル検出は、無限ループを防ぐための保険として残す。
            total_steps += steps;
            
            // 経路上のすべての値をメモ化する（DP/メモ化の典型的な使い方）
            let temp_n = n;
            let temp_steps_map = new Map<number, number>();
            temp_steps_map.set(1, 0);
            temp_steps_map.set(n, 0);
            
            // 逆方向から計算してメモ化する方が効率的だが、ここでは順方向のメモ化を試みる。
            // 順方向のメモ化：nから1へのパスを辿る
            let current_n_memo = n;
            let current_steps_memo = 0;
            const visited_in_path = new Set<number>();
            
            while (current_n_memo !== 1 && !visited_in_path.has(current_n_memo)) {
                visited_in_path.add(current_n_memo);
                if (current_n_memo % 2 === 0) {
                    current_n_memo /= 2;
                } else {
                    current_n_memo = 3 * current_n_memo + 1;
                }
                current_steps_memo++;
            }
            
            if (current_n_memo === 1) {
                // 1に到達した。このパスのステップ数を記録する。
                // 実際には、このwhileループで求めたcurrent_steps_memoがnから1へのステップ数。
                memo.set(n, current_steps_memo);
                total_steps += current_steps_memo;
            } else {
                // サイクルまたは到達不能（この問題では起こらないはず）
                // サイクル検出が機能していれば、このパスは無視されるべき。
            }

        } else {
            // 1に到達しなかった場合（サイクル検出が機能した場合）
            // このケースは、この問題の操作（コネルの問題）では発生しないため、通常は無視される。
        }
    }

    // 最終的な合計を出力
    console.log(`total=${total_steps}`);
}

solve();
