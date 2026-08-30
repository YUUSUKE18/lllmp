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
    // 各行が個別のクエリ n であると解釈します。
    
    let total_steps = 0;
    const memo = new Map<number, number>();

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n) || n < 1) continue;

        if (n === 1) {
            // n が 1 のときの手数は 0
            const steps = 0;
            total_steps += steps;
            memo.set(n, steps);
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            total_steps += memo.get(n)!;
            continue;
        }

        // 計算処理（ハミルトニアン問題の操作）
        let current_n = n;
        let steps = 0;
        const path = new Set<number>(); // サイクル検出用

        while (current_n !== 1) {
            if (path.has(current_n)) {
                // サイクルに陥った場合、この経路は無限ループになるが、
                // 1に到達する経路が必ず存在する（3n+1問題の性質）ため、
                // サイクル検出は厳密には不要だが、メモ化の安全策として残す。
                // ここでは、サイクルに到達した場合は、その経路のステップ数を計算し、
                // サイクル内のステップ数を加算して終了する。
                // ただし、この問題は「1に到達するまでの手数」を問うため、
                // サイクルに陥った場合は、そのサイクルを考慮する必要がある。
                // 3n+1問題では、必ず1に到達するため、サイクル検出は厳密には不要だが、
                // 効率化のため、到達した値のメモ化を優先する。
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

        // 1に到達したか、またはサイクルに到達した後の処理
        if (current_n === 1) {
            // 1に到達した場合
            const final_steps = steps;
            total_steps += final_steps;
            memo.set(n, final_steps);
        } else {
            // サイクルに陥った場合（この問題設定では通常発生しないが、念のため）
            // サイクル内のステップ数を計算し、それらを加算する。
            // 3n+1問題では、1に到達する経路が保証されているため、この分岐は通常実行されない。
            // 厳密なメモ化のため、到達した値のステップ数を記録する。
            // ここでは、サイクル検出が成功した場合は、その経路のステップ数を記録する。
            // サイクル検出が成功した場合は、その経路のステップ数を記録する。
            // 実際には、この問題は「1に到達するまでの手数」なので、サイクル検出は不要で、
            // 単純に1に到達するまで計算すれば良い。
            
            // 再計算してメモ化する（サイクル検出を無視して、単純に計算する）
            let temp_n = n;
            let temp_steps = 0;
            while (temp_n !== 1) {
                if (temp_n % 2 === 0) {
                    temp_n /= 2;
                } else {
                    temp_n = 3 * temp_n + 1;
                }
                temp_steps++;
            }
            total_steps += temp_steps;
            memo.set(n, temp_steps);
        }
    }

    console.log(`total=${total_steps}`);
}

solve();
