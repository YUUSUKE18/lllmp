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
    let totalSteps = 0;

    /**
     * 置き換え操作を繰り返し、1に到達するまでの手数を計算する関数
     * @param n 初期値
     * @returns 1に到達するまでの手数
     */
    function calculateSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let currentN = n;
        let steps = 0;

        while (currentN !== 1) {
            if (currentN % 2 === 0) {
                currentN = currentN / 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            steps++;
        }

        // 経路上のすべての値の計算結果をメモ化（DP的なメモ化）
        // ここでは、元のnから1に到達するまでの手数を求めたいので、
        // 途中の値での手数を直接メモ化するのではなく、
        // 質問の意図に従い、各クエリnに対する手数を計算し、その合計を求める。
        // ただし、問題文「n が 1 のときの手数は 0 です」と「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます」
        // の解釈として、各クエリnについて、その操作を繰り返した結果1に到達するまでの操作回数を求める、と解釈します。
        
        // 再度、操作を繰り返す中で、全ての途中値の計算結果をメモ化するのが最も効率的です。
        // ただし、これは「各クエリn」に対する計算ではなく、「すべての可能なn」に対する遷移をメモ化することになります。
        // 今回はクエリごとに計算する、という流れなので、calculateSteps内でのメモ化は、再帰的な呼び出しや、
        // 複数のクエリが同じ中間値を生成する場合に役立ちます。
        
        // この問題は、各クエリnについて「n -> ... -> 1」のパスの長さを求める問題であり、
        // 通常、このタイプの問題では、入力されたnから1への到達過程の長さを求めることが求められます。
        // 操作の反復回数を求めるため、ここでは単純な反復計算で十分であり、Memoizationは、
        // 異なるクエリが同じ中間値を生成した場合に有効になります。
        
        // 戻り値はnから1への手数
        memo.set(n, steps);
        return steps;
    }

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (Number.isNaN(n) || n < 1) continue;

        if (!memo.has(n)) {
            const steps = calculateSteps(n);
            totalSteps += steps;
        }
    }

    console.log(`total=${totalSteps}`);
}

solve();
