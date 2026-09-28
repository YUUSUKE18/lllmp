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

    // 最初の行がクエリの数（または最初の数）であると仮定し、残りをクエリとして扱う
    // 仕様に基づくと、入力は「1 以上の整数が 1 行に 1 個ずつ並びます（クエリ）」なので、
    // 各行がクエリ n であると解釈します。
    
    let total_steps = 0;
    const memo = new Map<number, number>();

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n) || n < 1) continue;

        if (n === 1) {
            // n が 1 のときの手数は 0
            const steps = 0;
            total_steps += steps;
            // memo.set(1, 0); // 1 の場合は既に処理済みだが、念のため
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            const steps = memo.get(n)!;
            total_steps += steps;
            continue;
        }

        // 再帰的または反復的に計算（メモ化を利用）
        let current_n = n;
        let steps = 0;
        const path = new Set<number>(); // サイクル検出用

        while (current_n !== 1) {
            if (path.has(current_n)) {
                // サイクルに陥った場合、この経路は無限ループになる可能性があるが、
                // 3n+1問題では必ず 1 に収束するため、このケースは通常発生しない。
                // ただし、メモ化の目的は「到達した値」を記録することなので、
                // サイクル検出は厳密には不要だが、安全のため。
                // ここでは、到達した値が既に計算済みであればそこで終了する。
                break; 
            }
            
            // 現在の値を記録
            path.add(current_n);
            
            if (current_n % 2 === 0) {
                current_n = current_n / 2;
            } else {
                current_n = 3 * current_n + 1;
            }
            steps++;
        }

        // 1 に到達したか、または既にメモ化されている値に到達したかを確認
        if (current_n === 1) {
            // 1 に到達したときのステップ数を計算し、メモ化する
            // この計算は、ループ内で既に steps が加算されているため、
            // 1 に到達したときのステップ数を正確に把握する必要がある。
            // 再計算してステップ数を確定させる。
            let temp_n = n;
            let calculated_steps = 0;
            while (temp_n !== 1) {
                if (temp_n % 2 === 0) {
                    temp_n /= 2;
                } else {
                    temp_n = 3 * temp_n + 1;
                }
                calculated_steps++;
            }
            
            memo.set(n, calculated_steps);
            total_steps += calculated_steps;
        } else if (memo.has(current_n)) {
            // サイクル検出で途中でメモ化された値に到達した場合
            const steps_from_memo = memo.get(current_n)!;
            // n から current_n までのステップ数 + current_n から 1 までのステップ数
            // ここでは、n から current_n までのステップ数 (steps - steps_from_memo) + memo[current_n]
            // ただし、この問題は「n から 1 に到達するまでの手数」を求めるため、
            // サイクル検出は不要で、単に到達したときのステップ数を記録すれば良い。
            
            // 簡略化のため、ループ内で計算した steps をそのまま使用する。
            // サイクル検出は、計算が無限に続くことを防ぐためのものであり、
            // 3n+1問題では必ず収束するため、ここでは単に到達したときのステップ数を記録する。
            
            // 既に計算された値があれば、その結果を適用する
            memo.set(n, steps + memo.get(current_n)!);
            total_steps += memo.get(n)!;
        } else {
            // サイクル検出が不要な場合、ループで計算した steps を使用
            memo.set(n, steps);
            total_steps += steps;
        }
    }

    console.log(`total=${total_steps}`);
}

solve();
