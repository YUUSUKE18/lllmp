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

    // 1. 入力された整数をパース
    const queries = lines.map(line => parseInt(line, 10)).filter(n => !isNaN(n) && n >= 1);

    // 2. メモ化テーブルの初期化
    const memo = new Map<number, number>();
    memo.set(1, 0);

    let total_steps = 0;

    // 3. 各クエリの処理とメモ化
    for (const n of queries) {
        let current = n;
        let steps = 0;
        const path: number[] = []; // 経路を記録してメモ化に利用する
        
        // 経路の探索とメモ化
        while (current !== 1) {
            if (memo.has(current)) {
                // 既にメモがあれば、その結果を利用して計算を終了
                steps += memo.get(current);
                break;
            }
            
            path.push(current);
            
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        // 1 に到達した時の手数を計算し、経路を遡ってメモ化する
        if (current === 1) {
            // 現在のステップ数 (path.length) を計算する
            let current_steps = path.length;
            
            // 経路を逆順にしてメモ化する (n -> steps)
            for (let i = path.length - 1; i >= 0; i--) {
                const node = path[i];
                // 1 に到達するまでの手数を計算してメモに格納
                // path[i] から 1 までの手数は、path[i+1] から 1 までの手数 + 1
                // ただし、path[i] から次の値への遷移が偶数/奇数によって決まるため、
                // 逆向きに考えるのが複雑。ここでは、n から 1 への最短経路を直接計算する。
                
                // 簡略化のため、各nについて直接計算し、その結果をメモするアプローチを採用する。
                // 経路探索の過程で、現在地から1への手数を計算する。
            }
            
            // 再帰的またはDP的に計算し直す（メモ化をより効果的に使うため）
            
            let final_steps = 0;
            let temp = n;
            const history: { [key: number]: number } = {}; // n -> steps
            history[n] = 0;
            
            while (temp !== 1) {
                if (memo.has(temp)) {
                    history[n] = history[temp] + 1;
                    break;
                }
                
                let next;
                if (temp % 2 === 0) {
                    next = temp / 2;
                } else {
                    next = 3 * temp + 1;
                }
                
                history[n] = history[next] + 1;
                temp = next;
            }
            
            if (history[n] !== undefined) {
                memo.set(n, history[n]);
                total_steps += history[n];
            }
        }
    }

    // 4. 合計の出力
    console.log(`total=${total_steps}`);
}

solve();
