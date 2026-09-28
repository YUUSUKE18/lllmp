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

    // 1. 入力のパース
    const initialNumbers = lines.map(line => parseInt(line, 10));
    
    if (initialNumbers.length === 0) {
        console.log("total=0");
        return;
    }

    // 2. メモ化された関数 (Memoization)
    const memo = new Map<number, number>();

    /**
     * 置き換え操作を繰り返し、1に到達するまでの手数を計算する
     * @param n 初期値
     * @returns 1に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let currentN = n;
        let steps = 0;
        
        // 1に到達するまで繰り返す
        while (currentN !== 1) {
            if (currentN % 2 === 0) {
                currentN = currentN / 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            steps++;
        }

        // 経路上のすべての値のメモ化（これは問題の意図を正確に反映していない可能性があるため、
        // 厳密には「nから1への経路」ではなく「nが辿る経路上の各値」をメモ化する方が効率的だが、
        // ここでは「nから1への到達ステップ数」のみをメモ化する）
        memo.set(n, steps);
        return steps;
    }

    // 3. 全クエリの処理と合計の計算
    let totalSteps = 0;
    
    for (const n of initialNumbers) {
        if (isNaN(n) || n < 1) continue;
        
        // 各クエリに対してステップ数を計算
        const steps = countSteps(n);
        totalSteps += steps;
    }

    // 4. 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
