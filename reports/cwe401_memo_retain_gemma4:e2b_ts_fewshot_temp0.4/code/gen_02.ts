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

    // 最初の行がクエリの開始値
    let n = parseInt(lines[0], 10);
    if (isNaN(n)) {
        // 最初の行が整数でない場合は無視
        console.log("total=0");
        return;
    }

    let total_steps = 0;
    // メモ化テーブル: n -> 手数
    const memo = new Map<number, number>();

    /**
     * 繰り返し操作の手数を計算する関数 (3n+1問題)
     * @param start n の初期値
     * @returns 1 に到達するまでの手数
     */
    function calculate_steps(start: number): number {
        if (start === 1) {
            return 0;
        }
        if (memo.has(start)) {
            return memo.get(start)!;
        }

        let current = start;
        let steps = 0;
        
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // 経路上のすべての値のメモ化 (DP的なメモ化)
        // ただし、この問題は「1に到達するまでの手数」を求めるため、
        // 経路上の各ステップの計算結果をメモ化する方が効率的。
        // ここでは、スタートから1へのパスを辿る計算結果をメモ化する。
        
        // 経路上の各値をメモ化するのではなく、スタートから1へのパスを辿る過程で
        // どの値がどのステップで出現したかを追跡する方が、
        // 複数のクエリで共通の計算を再利用するのに適している。
        // しかし、問題の要求は「各クエリ n について、n が 1 に到達するまでの手数を求め、その合計を求める」
        // なので、各クエリ n の計算結果をメモ化すれば十分。
        
        memo.set(start, steps);
        return steps;
    }

    // すべての行を処理
    for (let i = 1; i < lines.length; i++) {
        const current_n = parseInt(lines[i], 10);
        if (isNaN(current_n)) continue;

        // 既に計算済みの場合はメモから取得
        if (memo.has(current_n)) {
            total_steps += memo.get(current_n)!;
        } else {
            const steps = calculate_steps(current_n);
            total_steps += steps;
        }
    }

    console.log(`total=${total_steps}`);
}

solve();
