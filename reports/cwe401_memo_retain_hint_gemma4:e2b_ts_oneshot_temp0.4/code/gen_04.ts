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

    // 1. 入力の読み込みとクエリの抽出
    const queries = [];
    for (const line of lines) {
        const n = parseInt(line, 10);
        if (!isNaN(n) && n >= 1) {
            queries.push(n);
        }
    }

    // 2. メモ化された関数 (手数を計算する関数)
    const memo = new Map<number, number>();

    /**
     * 置き換え操作を繰り返し、1に到達するまでの手数を計算する
     * @param n 初期値
     * @returns 手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current = n;
        let steps = 0;
        
        // 1に到達するまで繰り返す
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // 経路上のすべての値のメモ化（より効率的な計算のため）
        // ただし、この問題の要求は「nから1への手数」なので、再帰的なメモ化で十分。
        // ここでは、計算過程で現れる値のメモ化を試みる。
        // ただし、この問題は「nから1への手数」を求めるため、標準的なCollatz問題のメモ化を適用する。
        
        // ここでは、純粋にnから1への手数を求めるため、再帰的なメモ化を適用する。
        // 経路上のすべての値のメモ化は、もし複数のクエリが同じ中間値を参照する場合に有効だが、
        // 今回は各クエリが独立して計算されるため、関数呼び出しのメモ化のみで十分。
        
        memo.set(n, steps);
        return steps;
    }

    // 3. すべてのクエリの手数の合計を計算
    let totalSteps = 0;
    for (const n of queries) {
        totalSteps += countSteps(n);
    }

    // 4. 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
