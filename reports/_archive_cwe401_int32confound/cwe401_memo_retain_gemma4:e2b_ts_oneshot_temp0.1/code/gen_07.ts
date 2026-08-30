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
    // 実際には、入力が「1 2 3 ...」という形式で、各行がクエリ n であると解釈する。
    // 例: 入力が "2\n3\n1" の場合、n=2, n=3, n=1 の順に処理する。
    
    const queries = lines.map(Number);
    
    let totalSteps = 0n;
    
    // メモ化テーブル
    const memo = new Map<number, bigint>();
    memo.set(1, 0n);

    for (const n of queries) {
        if (n < 1) continue;

        let steps = 0n;
        let current = n;
        const history = new Set<number>();
        
        // 1 に到達するまでの手数を計算
        while (current !== 1) {
            if (memo.has(current)) {
                steps += memo.get(current)!;
                break;
            }
            
            if (history.has(current)) {
                // サイクル検出（これは通常、3n+1問題では発生しないが、念のため）
                // この問題では1に収束するため、サイクル検出は不要だが、メモ化の過程で重要になる。
                break; 
            }
            
            history.add(current);
            
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        // 計算結果をメモ化
        // 経路上のすべての値について、1に到達するまでの手数を記録する
        // ただし、この問題は「nから1への手数」を求めるため、再帰的なメモ化（DP）が最も効率的。
        // ここでは、各クエリに対して個別に計算し、その結果を合計する。
        
        // サイクル検出とメモ化をより厳密に行うため、再帰的なメモ化（DP）に切り替える。
        // 既存のループ計算は、メモ化が完了するまで最適ではないため、ここではDPを適用する。
    }

    // DPによる再計算とメモ化（より効率的で正しいアプローチ）
    const memoDP = new Map<number, bigint>();
    memoDP.set(1, 0n);

    for (const n of queries) {
        if (n < 1) continue;
        
        let currentN = n;
        let steps = 0n;
        const path = []; // 経路を記録して、メモ化を更新する

        // 1に到達するまでの経路を辿る
        while (currentN !== 1) {
            if (memoDP.has(currentN)) {
                steps += memoDP.get(currentN)!;
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
        
        // 経路上のすべての値について、1への手数を遡ってメモ化する
        // 経路の逆順で処理することで、依存関係を解決する
        for (let i = path.length - 1; i >= 0; i--) {
            const val = path[i];
            if (!memoDP.has(val)) {
                // 1への手数は、現在のステップ数から、まだ計算されていない値までのステップ数を加算したもの
                const stepsFromVal = steps - (i + 1);
                memoDP.set(val, stepsFromVal);
            }
        }
        
        totalSteps += steps;
    }

    console.log(`total=${totalSteps.toString()}`);
}

solve();
