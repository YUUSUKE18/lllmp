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

    // 1. 入力を整数配列としてパース
    const n = lines.map(Number);
    
    let total_steps = 0;
    const memo = new Map<number, number>();

    /**
     * 置き換え操作を繰り返し、1に到達するまでの手数を計算する関数
     * @param start 初期値
     * @returns 1に到達するまでの手数
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
        
        memo.set(start, steps);
        return steps;
    }

    // 2. 各クエリに対して計算と合計を求める
    for (const n_i of n) {
        // n_i が整数として有効であるか確認（読み取り時にパースで既にフィルタリング済みだが念のため）
        if (Number.isInteger(n_i)) {
            const steps = calculate_steps(n_i);
            total_steps += steps;
        }
    }

    // 3. 結果を出力
    console.log(`total=${total_steps}`);
}

solve();
