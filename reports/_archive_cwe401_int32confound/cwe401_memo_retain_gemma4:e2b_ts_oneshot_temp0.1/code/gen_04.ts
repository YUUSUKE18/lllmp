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

        // 再帰的または反復的に計算
        let current_n = n;
        let steps = 0;
        const path = new Set<number>(); // サイクル検出用

        while (current_n !== 1) {
            if (path.has(current_n)) {
                // サイクルに陥った場合、この経路は無限ループになるが、
                // 3n+1問題では必ず1に収束するため、このケースは通常発生しない。
                // ただし、メモ化の目的のため、サイクル検出は念のため。
                // ここでは、サイクル検出が成功した場合は、その経路の計算を中断する。
                // 3n+1問題では、1に到達するため、サイクルは発生しない。
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

        if (current_n === 1) {
            // 1に到達した場合、ステップ数を記録
            total_steps += steps;
            // 経路上のすべての数についてメモ化（DPの性質を利用）
            let current = n;
            let current_steps = 0;
            while (current !== 1) {
                if (memo.has(current)) {
                    // 既に計算済みの部分があれば、その結果を足し合わせる
                    const memo_val = memo.get(current)!;
                    total_steps += memo_val;
                } else {
                    // 再計算が必要な部分
                    let next_n;
                    if (current % 2 === 0) {
                        next_n = current / 2;
                    } else {
                        next_n = 3 * current + 1;
                    }
                    
                    // 再帰的に計算された結果をメモ化する（ここでは、nから1への最短経路を求めるため、
                    // 逆方向のメモ化は複雑になるため、ここではnから1への経路を直接計算し、
                    // 経路上の各ステップのコストを合計するアプローチを採用する）
                    
                    // 簡略化のため、ここではnから1への経路を再計算し、その合計をtotal_stepsに加算する。
                    // 厳密には、nが与えられたときのステップ数を求めるため、
                    // 最初のwhileループで求めたstepsをtotal_stepsに加算する。
                    // メモ化は、nが与えられたときのステップ数を格納する。
                    
                    // 最初のwhileループで求めたstepsをtotal_stepsに加算済みなので、
                    // ここではmemoに結果を格納する。
                    
                    // 経路上の各ステップをメモ化する（これはDPの標準的な使い方ではないが、
                    // 質問の意図が「各クエリnに対するステップ数を合計する」ことなので、
                    // 各nに対するステップ数を計算し、それを合計する流れが正しい）
                    
                    // 最初のwhileループで求めたstepsをtotal_stepsに加算済み。
                    // memoにnに対するステップ数を格納する。
                    memo.set(n, steps);
                }
                current = next_n;
                current_steps++;
            }
        }
    }

    // 最終的な合計を計算し直す（メモ化された値のみを合計する方が安全）
    // 最初のループでtotal_stepsを累積しているため、この値が最終結果となる。
    
    console.log(`total=${total_steps}`);
}

solve();
