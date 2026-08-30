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
    
    // メモ化のためのマップ
    const memo = new Map<number, number>();

    /**
     * 繰り返し操作の手数を計算する関数 (3n+1問題)
     * @param start n の初期値
     * @returns 1 に到達するまでの手数
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
        
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        // 経路圧縮（メモ化）
        // この問題では、各クエリが独立しているため、再帰的なメモ化よりも、
        // 実際に計算した経路を記録する方が効率的かもしれないが、
        // ここでは「各クエリ n について、n が 1 に到達するまでの手数を求める」という指示に従い、
        // 1回の計算で結果を得ることを優先する。
        // ただし、問題文は「すべてのクエリの手数の合計を求めます」とあるため、
        // 実際には入力された各行が独立したクエリであると解釈し、
        // 各行に対して計算し、その合計を求める必要がある。
        
        // 実際には、入力された各行が独立したクエリであるため、
        // この関数は単一のクエリに対する答えを返す。
        memo.set(start, steps);
        return steps;
    }

    let totalSteps = 0;

    // 2行目以降の各行をクエリとして処理
    for (let i = 1; i < lines.length; i++) {
        const queryN = parseInt(lines[i], 10);
        if (!isNaN(queryN)) {
            // 各クエリについて手数を計算
            const steps = countSteps(queryN);
            totalSteps += steps;
        }
    }

    console.log(`total=${totalSteps}`);
}

solve();
