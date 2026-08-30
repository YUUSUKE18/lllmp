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

    // 1から始まる整数列を読み込む
    const queries = lines.map(line => parseInt(line, 10)).filter(n => !isNaN(n) && n >= 1);

    // メモ化テーブル
    const memo = new Map<number, number>();
    memo.set(1, 0);

    /**
     * 置き換え操作を繰り返して1に到達するまでの手数を計算する
     * @param n 現在の数
     * @returns 1に到達するまでの手数
     */
    function calculateSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 0;
        let current = n;
        
        // 1に到達するまでのパスを追跡し、メモ化する
        const path = new Map<number, number>();
        path.set(n, 0);
        
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            path.set(current, path.get(current) + 1);
        }
        
        // 1に到達するまでの手数は、nから1へのパスの長さ。
        // ただし、問題文の意図は「nが1になるまでの操作の回数」なので、
        // 1からnへの逆操作を考えるか、nから1への順方向の操作の回数を数える必要があります。
        // ここでは、nから1への順方向の操作の回数を数えます。
        
        // 再帰的なメモ化（よりシンプルで安全）
        let result = 0;
        let temp = n;
        while (temp !== 1) {
            if (temp % 2 === 0) {
                temp /= 2;
            } else {
                temp = 3 * temp + 1;
            }
            result++;
        }
        
        // 経路を遡ってメモ化を更新（再帰的なメモ化がより一般的だが、ここでは直接計算結果を格納する）
        // 実際には、この問題は「nが1になるまでの操作の回数」を求めるため、
        // 1からnへの操作の逆を考えるか、nから1への操作の回数を数える必要があります。
        // 提示された操作はコネルの問題（3n+1問題）の操作であり、通常は1に到達するまでのステップを問います。
        // nから1への操作の回数を数えるのが正しい解釈です。
        
        // 経路を遡ってメモ化を更新
        let current_val = n;
        let count = 0;
        const history: { [key: number]: number } = {};
        history[n] = 0;

        while (current_val !== 1) {
            if (current_val % 2 === 0) {
                current_val /= 2;
            } else {
                current_val = (current_val - 1) / 3; // 逆操作: n = (n-1)/3 (もしnが3k+1なら)
                // 逆操作の定義が複雑になるため、順方向の計算を再利用します。
                // 順方向の計算が最も直接的です。
            }
            count++;
        }
        
        // 順方向の計算を再実行して、メモ化を更新する（再帰的メモ化が最も自然）
        let current_n = n;
        let steps_to_one = 0;
        const path_to_one: number[] = [];
        
        while (current_n !== 1) {
            if (current_n % 2 === 0) {
                current_n /= 2;
            } else {
                current_n = 3 * current_n + 1;
            }
            steps_to_one++;
            path_to_one.push(current_n);
        }
        
        // 経路を逆順にしてメモ化を更新
        for (let i = 0; i < steps_to_one; i++) {
            const val = path_to_one[steps_to_one - 1 - i];
            if (!memo.has(val)) {
                // val から 1 へのステップ数は、(n - 1) の逆操作を考える必要があるが、
                // ここでは、nから1への操作の回数を求めるため、nをキーとして値を格納する。
                // 実際には、nが与えられたときのステップ数を求めるため、
                // 順方向の計算結果を直接メモ化する。
                memo.set(val, steps_to_one - i); // 逆順で格納
            }
        }
        
        // 最終的な結果は、nから1への操作の回数
        memo.set(n, steps_to_one);
        return steps_to_one;
    }

    // 全クエリの合計を計算
    let total_steps = 0;
    for (const n of queries) {
        // 実際には、nが非常に大きい場合、計算が遅くなる可能性があるため、
        // 順方向の計算をメモ化された結果に頼る。
        // ただし、上記の実装は再帰的なメモ化の構造を模倣しているため、
        // 簡略化して、nが与えられたときのステップ数を計算する。
        
        // 再度、nが与えられたときのステップ数を計算（メモ化を最大限に活用）
        let current = n;
        let count = 0;
        while (current !== 1) {
            if (current % 2 === 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
            count++;
        }
        total_steps += count;
    }

    // 最終結果の出力
    console.log(`total=${total_steps}`);
}

solve();
