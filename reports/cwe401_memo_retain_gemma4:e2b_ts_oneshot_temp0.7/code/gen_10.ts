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

    let totalSteps = 0;
    const memo = new Map<number, number>();

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (Number.isNaN(n)) continue;

        if (n === 1) {
            // 1 に到達するまでの手数は 0
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            totalSteps += memo.get(n);
            continue;
        }

        // 再帰的または反復的に計算（ここでメモ化を適用）
        let currentN = n;
        let steps = 0;
        const path = []; // 経路を記録してメモ化に使用

        while (currentN !== 1) {
            if (memo.has(currentN)) {
                steps += memo.get(currentN);
                break;
            }
            
            path.push(currentN);

            if (currentN % 2 === 0) {
                currentN = currentN / 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            steps++;
        }

        // 最終的な結果をメモ化
        // ここで、経路上の全てのステップを考慮して、元の n から 1 に到達するまでの最小ステップ数を計算する必要がある。
        // しかし、問題文は「n が 1 のときの手数は 0 です」とあり、操作を繰り返すことを求めている。
        // 通常、この問題はコナーズの予想（3n+1問題）のステップ数を問うものであり、
        // 1 に到達するまでの操作回数を数える。
        
        // 再度、操作回数を数え直す（メモ化を考慮して）
        let current = n;
        let count = 0;
        const history = new Set<number>();
        
        while (current !== 1) {
            if (memo.has(current)) {
                count += memo.get(current);
                break;
            }
            
            history.add(current);

            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            count++;
        }
        
        // 経路上の全てのステップをメモ化する（深さ優先探索的なメモ化）
        // ただし、これは厳密には「n から 1 への最短経路」を求める問題（コナーズの予想）であり、
        // ここでは「操作を繰り返して 1 に到達するまでの手数」を求めているため、
        // 単純な操作回数を数えるのが妥当。
        
        // 簡略化のため、一旦、操作回数のみを計算し、メモ化は再帰的な構造に依存させる。
        // ここでは、単純な繰り返し操作のステップ数を求める。
        
        let steps_for_n = 0;
        let temp_n = n;
        while (temp_n !== 1) {
            if (temp_n % 2 === 0) {
                temp_n /= 2;
            } else {
                temp_n = 3 * temp_n + 1;
            }
            steps_for_n++;
        }

        // この問題は、各 n について、その操作の回数を計算し、合計を求める問題と解釈する。
        // メモ化は、同じ中間値が何度も出現する場合に役立つ。
        if (!memo.has(n)) {
            memo.set(n, steps_for_n);
            totalSteps += steps_for_n;
        } else {
            totalSteps += memo.get(n);
        }
    }

    console.log(`total=${totalSteps}`);
}

solve();
