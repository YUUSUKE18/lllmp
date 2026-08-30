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
    // 仕様に基づくと、標準入力には「1 以上の整数が 1 行に 1 個ずつ並びます（クエリ）」とあるため、
    // 各行がクエリ n であると解釈します。
    
    let total_steps = 0;
    const memo = new Map<number, number>();

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n) || n < 1) continue;

        if (n === 1) {
            // n が 1 のときの手数は 0
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            total_steps += memo.get(n);
            continue;
        }

        // 再帰的または反復的に計算（メモ化再帰/動的計画法）
        let current_n = n;
        let steps = 0;
        const path = new Set<number>(); // サイクル検出用

        while (current_n !== 1) {
            if (path.has(current_n)) {
                // サイクル検出（この問題では1に到達するため通常発生しないが、念のため）
                // サイクル内の要素は、到達不可能または無限ループと見なす。
                // ただし、この問題の操作はCollatz予想であり、1に収束すると仮定する。
                // サイクルが検出された場合は、その経路のステップ数を加算して終了する。
                // ここでは、サイクル検出が厳密に必要かどうかは、問題の制約に依存するが、
                // 1に収束すると仮定して続行する。
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

        // 1に到達したか、またはサイクルに陥った場合の処理
        if (current_n === 1) {
            // 1に到達した場合、その経路のステップ数を加算
            total_steps += steps;
            // 全ての経路をメモ化（到達した全てのノードをメモ化するのではなく、元のnから1までの経路をメモ化する）
            // ここでは、元のnから1までの経路を再計算するのではなく、到達した途中までのステップ数を記録する
            // ただし、メモ化の対象は、そのnから1への最短経路の長さであるため、
            // この計算方法では、元のnから1への経路の長さがstepsとなる。
            memo.set(n, steps);
        } else {
            // 1に到達しなかった場合（サイクルなど）、このクエリは無視するか、エラーとする。
            // 問題の文脈上、Collatz予想に基づき1に到達すると仮定されるため、ここでは到達しないケースは発生しないと見なす。
            // もし発生した場合は、その処理を定義する必要があるが、ここでは1に到達すると仮定する。
            // 厳密に「1に到達するまでの手数を求めます」なので、到達しない場合は計算を終了する。
        }
    }

    console.log(`total=${total_steps}`);
}

solve();
