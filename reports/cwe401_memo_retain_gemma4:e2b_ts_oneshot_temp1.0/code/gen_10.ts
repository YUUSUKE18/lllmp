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

    // メモ化テーブル
    const memo: Map<number, number> = new Map();
    let totalCount = 0;

    // 処理の実行
    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n)) continue;

        if (n === 1) {
            // n=1 のときの手数は 0
            const count = 0;
            memo.set(1, count);
            totalCount += count;
            continue;
        }

        // 再帰とメモ化による計算
        let currentN = n;
        let steps = 0;
        const path: number[] = []; // 経路を記録してメモ化を効率的に行うため

        while (currentN !== 1) {
            if (memo.has(currentN)) {
                // メモ化された値があればそれを利用
                steps += memo.get(currentN);
                break;
            }
            
            path.push(currentN);
            
            if (currentN % 2 === 0) {
                currentN /= 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            steps++;
        }

        // 経路上の値を逆順にメモ化する
        // n から 1 に到達するまでの全ステップ数を計算し、パス上の全ての値をメモ化する。
        // ここでは、n から 1 に到達するまでの「手数」を計算するために、再帰的なメモ化（または直接のパス追跡）を適用する。
        // この問題は、各クエリ n について、n -> ... -> 1 に到達する操作の回数を求める問題であり、
        // 各ステップで同じ値が再出現する場合（例: 13 -> 40 -> 20 -> 10 -> 5 -> 16 -> ...）を考慮する必要がある。

        // 仕様に基づき、各クエリ n について n から 1 への最短経路の数を求める。
        // ここでは、クエリ n について直接到達するまでの手数を計算し、その経路で発生した中間値をメモ化する。
        
        // 再計算: 各 n について、n -> ... -> 1 へのステップ数を計算し、その過程でmemoを更新する。
        
        let current_n = n;
        const path_n = [];
        
        // nから1へのパスを辿り、途中の値がmemo化されていればそれを利用する
        while (current_n !== 1) {
            if (memo.has(current_n)) {
                const steps_from_n = memo.get(current_n);
                totalCount += steps_from_n;
                // nから現在の値までのステップ数を加算して終了
                totalCount += path_n.length;
                break;
            }

            path_n.push(current_n);
            
            if (current_n % 2 === 0) {
                current_n /= 2;
            } else {
                current_n = 3 * current_n + 1;
            }
        }
        
        if (current_n === 1) {
            // 1に到達した。最後のステップ数を加算する。
            totalCount += path_n.length;
            
            // 経路上の値をメモ化する (逆順に)
            for (let i = path_n.length - 1; i >= 0; i--) {
                memo.set(path_n[i], path_n.length - i); // 1から逆算した手数を格納
            }
        }
    }

    // 最終結果の出力
    console.log(`total=${totalCount}`);
}

solve();
