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

    // 最初の行がクエリの数と仮定するが、仕様に従い、入力全体を整数として処理する
    // 実際には、入力が「1 2 3 ...」という形式で、各行がクエリnを表すと解釈する。
    // 例: 入力が "2\n3\n1" の場合、n=2, n=3, n=1 の順に処理する。
    
    let total_steps = 0;
    const memo = new Map<number, number>();

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n) || n < 1) continue;

        if (n === 1) {
            // nが1のときの手数は0
            // memo.set(1, 0); // 1はベースケースなので、ここでは計算しない
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            total_steps += memo.get(n);
            continue;
        }

        // 再帰的または反復的に計算
        let current_n = n;
        let steps = 0;
        const path = new Set<number>(); // サイクル検出用

        while (current_n !== 1) {
            if (path.has(current_n)) {
                // サイクル検出。この問題では1に到達するはずだが、念のため。
                // サイクルに入った場合、その経路のステップ数を加算し、サイクル内のステップ数を考慮する必要があるが、
                // 1に到達する問題なので、通常はサイクルは発生しない（または1に到達する）。
                // この問題はCollatz予想に関連しており、1に収束すると仮定する。
                // サイクル検出は、計算が無限に続くことを防ぐため。
                // ここでは、サイクルに入ったら計算を打ち切る（実際にはこの問題では発生しないはず）。
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
        
        // 1に到達したか、またはサイクルを検出した
        if (current_n === 1) {
            // 1に到達したときのステップ数を記録
            // 経路上のすべての値のメモ化（DP/メモ化）
            let temp_n = n;
            let current_steps = 0;
            const history = [];
            
            // 1に到達するまでの経路を再計算し、メモ化する
            while (temp_n !== 1) {
                history.push(temp_n);
                if (temp_n % 2 === 0) {
                    temp_n /= 2;
                } else {
                    temp_n = 3 * temp_n + 1;
                }
                current_steps++;
            }
            
            // 1に到達したときのステップ数は、計算したステップ数 + 1 (最後のステップで1になった)
            // または、ループ内でカウントした steps が正しい。
            // n=4 -> 2 (1) -> 1 (2ステップ)
            // n=3 -> 10 (1) -> 5 (2) -> 16 (3) -> 8 (4) -> 4 (5) -> 2 (6) -> 1 (7ステップ)
            
            // 経路を遡ってメモ化する
            let current_val = n;
            let current_step_count = 0;
            const path_to_memo = [];

            while (current_val !== 1) {
                path_to_memo.push(current_val);
                if (current_val % 2 === 0) {
                    current_val /= 2;
                } else {
                    current_val = 3 * current_val + 1;
                }
                current_step_count++;
            }
            
            // 1に到達したときのステップ数は current_step_count
            memo.set(n, current_step_count);
            total_steps += current_step_count;

            // 経路上のすべての値のメモ化（逆順に）
            for (let i = path_to_memo.length - 1; i >= 0; i--) {
                memo.set(path_to_memo[i], (path_to_memo.length - 1 - i) + (1 - (path_to_memo[i] === 1 ? 0 : 1))); // これは複雑になるため、単純に再帰的なメモ化を適用する
            }
            
            // 簡略化のため、再帰的なメモ化を適用する（再帰呼び出しを避けるため、ここでは直接計算結果をメモ化する）
            // 実際には、nが大きくなる可能性があるため、再帰的なメモ化が最も効率的だが、ここでは反復計算の結果を直接利用する。
            
        } else {
            // サイクルまたは到達不能（この問題では発生しないはず）
            // エラー処理や無視
        }
    }

    // 最終的な合計を出力
    console.log(`total=${total_steps}`);
}

// 実際の実行環境に合わせて、標準入力から読み込む処理を調整する。
// Node.jsの標準的な競技プログラミング環境では、fs.readFileSync(0)が標準入力全体を読み込む。
solve();
