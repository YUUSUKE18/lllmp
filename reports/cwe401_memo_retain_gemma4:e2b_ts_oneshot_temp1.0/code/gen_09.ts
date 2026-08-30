const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (input === "") {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    if (lines.length === 0) {
        console.log("total=0");
        return;
    }

    // スタックまたはマップを用いたメモ化
    const memo = new Map<number, number>();
    let total_steps = 0;

    // 処理対象の入力（クエリ）をスタックまたはキューとして保持
    const queue: number[] = [];
    for (const line of lines) {
        const n = parseInt(line, 10);
        if (!isNaN(n)) {
            queue.push(n);
        }
    }

    // BFSまたはDFSで処理。ここでは各クエリを独立に処理し、メモ化を活用する。
    // ただし、課題の要求は「すべてのクエリの手数の合計」であり、各クエリが独立しているため、
    // 各クエリの計算結果を合計すればよい。
    
    for (const start_n of queue) {
        if (start_n === 1) {
            // 1から1に到達するまでの手数は0
            memo.set(start_n, 0);
        } else if (!memo.has(start_n)) {
            let current_n = start_n;
            let steps = 0;
            const path: number[] = []; // 経路を記録して、重複を避けるためのチェックにも使えるが、ここでは再帰/反復で十分。

            while (current_n !== 1 && !memo.has(current_n)) {
                // 3n+1 または n/2 の操作
                if (current_n % 2 === 0) {
                    current_n /= 2;
                } else {
                    current_n = 3 * current_n + 1;
                }
                steps++;
                
                // 64bitの範囲内に収まることを前提とするが、無限ループや非常に大きな値への対策は、
                // 課題の制約とゴール(1)が存在することを信じてここでは省略する。
                if (steps > 1000000) { // 安全策としてのループ制限
                    // もし到達不可能（または非常に時間がかかる）場合はスキップ
                    break;
                }
            }
            
            if (current_n === 1) {
                // 1に到達したときのステップ数を記録
                // この再帰的な性質を持つ問題（コネルの問題）は、通常、
                // 1に到達するまでの「最短」の操作数を問うことが多いが、
                // ここでは「1に到達するまでの手数」を問うため、上記ループで計算したstepsがその手数となる。
                // ただし、memo化のために、現在の値から1に到達するまでのパスを辿る。
                
                // 厳密には、memo化の目的は、ある数xから1への最短経路を求めることである。
                // ここでは、start_nから1への経路を求める。
                
                // BFSを用いて、start_nから1への最短経路を計算する方が確実。
                // しかし、問題文の意図が「操作を繰り返して1に到達するまでの手数」なので、
                // 既存の計算（上記ループ）がその操作回数を表していると解釈する。
                
                // 再度、経路を辿って手数を正確に計算する（DFS/BFSの代わり）
                let current_val = start_n;
                let steps_to_one = 0;
                const visited_path: Set<number> = new Set();
                
                while (current_val !== 1) {
                    if (current_val === 1) break; // 念のため
                    
                    if (visited_path.has(current_val)) {
                        // 無限ループまたはサイクルに陥った場合、この経路は無効
                        // 通常、コネルの問題では、この操作は必ず1に収束するとされる。
                        // 念のため、この入力が想定外であれば処理を中断する。
                        break; 
                    }
                    
                    visited_path.add(current_val);
                    
                    if (current_val % 2 === 0) {
                        current_val /= 2;
                    } else {
                        current_val = 3 * current_val + 1;
                    }
                    steps_to_one++;
                }
                
                if (current_val === 1) {
                    memo.set(start_n, steps_to_one);
                } else {
                    // 1に到達できなかった場合（到達不可能な経路やループ）、このクエリは無視するか、エラーとする。
                    // 仕様に基づき、全てのクエリが1に到達すると仮定する。
                    // ここでは、到達できなかった場合は0ステップとして扱うか、無視する。
                    // 厳密には、この問題は「コネルの問題」であり、その結果は必ず1に収束する。
                    memo.set(start_n, 0); // 不明な場合は0とする（安全策）
                }

            }
        }
    }
    
    // 実際に計算した合計を求める
    let final_total = 0;
    for (const start_n of queue) {
        if (memo.has(start_n)) {
            final_total += memo.get(start_n);
        }
    }

    console.log(`total=${final_total}`);
}

solve();
