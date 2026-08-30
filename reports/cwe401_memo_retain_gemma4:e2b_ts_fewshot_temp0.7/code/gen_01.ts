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

    // 入力された整数をパース
    const queries = lines.map(line => parseInt(line, 10));

    if (isNaN(queries) || queries.length === 0) {
        console.log("total=0");
        return;
    }

    // メモ化のためのマップ
    const memo = new Map<number, number>();
    memo.set(1, 0);

    /**
     * 操作を繰り返し、1に到達するまでの手数を計算する関数
     * @param n 初期値
     * @returns 1に到達するまでの手数
     */
    function calculateSteps(n: number): number {
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 0;
        let current = n;
        
        // 1に到達するまで繰り返す
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        // 経路上の値をメモ化（逆順に計算して格納）
        // ここでは、計算の過程で現れる中間値も考慮してメモ化を試みる
        // ただし、問題の意図は「nから1への最短経路」ではなく「nを操作して1に到達するまでのステップ数」を求めることなので、
        // 実際には逆操作（1に戻る操作）でメモ化するのが一般的だが、ここでは与えられた操作を順に適用する。
        // 途中の値のメモ化は、再帰的な構造（カントール予想に関連する問題）では通常行われるが、
        // ここでは単純なシミュレーションとして、到達した値のみをメモ化する。
        // ただし、今回は「nが1になるまでの手数」なので、nを操作する過程で、その操作の回数のみを数えれば良い。
        
        // 実際には、nから1への経路を辿るため、nを操作するたびにステップ数を加算するだけで十分。
        // 再帰的なメモ化（DP）を適用する場合、nが大きく飛ぶため、単純なシミュレーションで十分か確認する。
        // 今回は「nが1になるまでの手数」なので、再帰的なDPではなく、直接シミュレーションで十分。
        
        // 経路上の値をメモ化（到達した値とそのステップ数を記録）
        let temp_n = n;
        let current_steps = 0;
        const path = new Map<number, number>();
        path.set(n, 0);

        while (temp_n !== 1) {
            if (temp_n % 2 === 0) {
                temp_n = temp_n / 2;
            } else {
                temp_n = 3 * temp_n + 1;
            }
            current_steps++;
            path.set(temp_n, current_steps);
        }
        
        // 最終的な結果をメモに追加（これは、その値から1に到達するのにかかった手数ではない。nから開始した手数）
        // この問題設定では、nから操作を繰り返して1に到達するまでのステップ数を求めるため、
        // 経路上の値が再訪された場合のメモ化が重要になる。
        
        // 簡略化のため、この関数は「nを操作して1になるまでの手数」を返すことに焦点を当てる。
        // 再帰的なメモ化（DP）を行う場合、通常は「n -> f(n)」の遷移を考える。
        // しかし、この問題は「nから始まる操作の回数」を求めるため、単純なシミュレーションが最も直接的。

        // ここでは、単にシミュレーションの結果を返す。
        memo.set(n, current_steps);
        return current_steps;
    }

    let total = 0;

    for (const n of queries) {
        if (n >= 1) {
            // 1に到達するまでの手数を計算
            const steps = calculateSteps(n);
            total += steps;
        }
    }

    console.log(`total=${total}`);
}

solve();
