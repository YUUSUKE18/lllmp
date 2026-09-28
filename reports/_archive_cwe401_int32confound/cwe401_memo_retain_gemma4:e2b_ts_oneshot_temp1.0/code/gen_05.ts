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

    // 最初の行をNと見なす
    let n = parseInt(lines[0], 10);
    
    // メモ化テーブル
    const memo = new Map<number, number>();

    /**
     * 操作を繰り返して1に到達するまでの手数を計算する関数
     * @param start 開始値
     * @returns 1に到達するまでの手数
     */
    function countSteps(start: number): number {
        if (start === 1) {
            return 0;
        }
        if (memo.has(start)) {
            return memo.get(start)!;
        }

        let current = start;
        let steps = 0;
        
        // 1に到達するまで計算を続ける
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

    let totalSteps = 0;

    // 2行目以降のクエリを処理
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const num = parseInt(line, 10);

        if (Number.isNaN(num)) continue;

        // 計算結果をメモ化（再帰的な呼び出しではなく、再計算を避けるため、今回は直接計算とメモ化を組み合わせる）
        // 問題文の意図は「各クエリ n について操作を繰り返して1に到達するまでの手数を求める」
        // ではなく、「与えられた整数 n に対して、操作を繰り返して1に到達するまでの手数を求め、その合計を求める」
        // と解釈し、各 n に対して countSteps を呼び出す。
        const steps = countSteps(num);
        totalSteps += steps;
    }

    console.log(`total=${totalSteps}`);
}

solve();
