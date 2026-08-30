/**
 * 仕様を満たすプログラム。
 * 題意はコネルの予想（3n+1問題）の順序を計算し、その総和を求める問題。
 * メモ化を用いて高速化する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0 || input[0] === "") {
        console.log("total=0");
        return;
    }

    // 入力から整数を抽出する
    const queries: number[] = [];
    for (const line of input) {
        const trimmedLine = line.trim();
        if (trimmedLine) {
            const num = parseInt(trimmedLine, 10);
            if (!isNaN(num) && num >= 1) {
                queries.push(num);
            }
        }
    }

    if (queries.length === 0) {
        console.log("total=0");
        return;
    }

    // メモ化テーブル
    const memo = new Map<number, number>();
    // 最終的な合計
    let totalSteps = 0;

    /**
     * 1に到達するまでの手数を再帰的または反復的に計算する関数（メモ化付き）
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
        
        // 1に到達するまでの操作を追跡
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                // 3n + 1。問題文の操作は「nが偶数ならn/2、奇数なら3n+1」
                // この操作がどのようにnから1への経路を定義するのか、
                // 典型的なコネルの予想の逆操作（n -> n/2 または (n-1)/3 * 4 + 1）とは異なるため、
                // ここでは問題文に厳密に従って再帰的なコスト計算を行う。
                // 問題文: nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。
                // これは、n から 1 に到達するのに必要な操作の回数 (ステップ数) を求めることを意味する。
                
                // ただし、もし「nを操作して1になるまでの操作回数」を求めるのであれば、
                // 通常は逆操作（1からnへの操作）を考えます。
                // ここでは、与えられた操作（n -> next_n）を繰り返して1に到達するまでのステップ数を数えます。

                // nが奇数の場合: 3n+1 に置き換える
                current = 3 * current + 1;
            }
            steps++;
        }

        // メモに追加して返す
        memo.set(n, steps);
        return steps;
    }

    // 全クエリに対して計算と合計を求める
    for (const n of queries) {
        // 各クエリについて、n から 1 に到達するまでのステップ数を計算する。
        // 注意: memoizeは、全てのクエリで共通の計算結果を再利用する。
        const steps = calculateSteps(n);
        totalSteps += steps;
    }

    // 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
