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

    // どの値を計算したか、その結果をメモするためのマップ
    const memo = new Map<number, number>();
    let total_steps = 0;

    // 処理対象の入力値のリスト
    const queries = lines.map(Number);

    // 補助関数: 1に到達するまでの手数を計算する（メモ化あり）
    function count_steps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 1;
        let current = n;
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        // メモに保存
        memo.set(n, steps);
        return steps;
    }

    // 全てのクエリに対する手数を計算し、合計する
    for (const n of queries) {
        if (n >= 1) {
            total_steps += count_steps(n);
        }
    }

    // 結果を出力
    console.log(`total=${total_steps}`);
}

solve();
