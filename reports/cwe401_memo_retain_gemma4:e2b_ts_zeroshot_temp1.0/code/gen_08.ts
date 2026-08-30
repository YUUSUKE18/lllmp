/**
 * 仕様を満たすプログラムを記述します。
 * 
 * 仕様：
 * 標準入力からクエリを受け取り、操作を繰り返して1に到達するまでの手数を求める。
 * 操作：nが偶数なら n/2、奇数なら 3n+1。n=1で終了（手数は0）。
 * すべてのクエリの手数の合計を求める。
 * メモ化を使用して高速化する。
 * 入力は整数として解釈され、無効な行は無視する。
 * 出力は `total=<合計>` の形式。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();
    
    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    // 最初の要素がクエリnであると仮定する（仕様から見て、入力が1行に1個ずつ並ぶ）
    // ただし、入力形式が「1行に1個ずつ並ぶ」という記述と、「クエリ」という記述が矛盾する可能性があるため、
    // 通常の競技プログラミングの入力形式（1行に複数の整数が並ぶ、または1行に1つの整数が並ぶ）を考慮する。
    // 仕様に従い、「標準入力に、1 以上の整数が 1 行に 1 個ずつ並びます（クエリ）」と解釈し、
    // 各行が1つのクエリnであると解釈し、そのnに対する計算を行う。
    // ただし、問題文の「クエリ n について...」という表現から、入力がクエリのシーケンスであると解釈し、
    // 最初の入力行が最初のnであると仮定する。もし入力が単一の整数nのみであれば、そのnについて計算する。
    // 典型的な問題設定として、入力全体がクエリのリストであると解釈し、各行が次のnであるとします。

    let queries: number[] = [];
    for (const line of lines) {
        const num = parseInt(line);
        if (!isNaN(num) && num >= 1) {
            queries.push(num);
        }
    }

    // メモ化テーブル (n -> 手数)
    const memo = new Map<number, number>();
    
    /**
     * 1に到達するまでの手数を計算する関数（メモ化付き）
     * @param n 変換対象の数
     * @returns 1に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 0;
        let currentN = n;

        while (currentN !== 1) {
            if (currentN % 2 === 0) {
                // n が偶数なら n/2
                currentN = Math.floor(currentN / 2);
            } else {
                // n が奇数なら 3n+1
                currentN = 3 * currentN + 1;
            }
            steps++;
        }

        memo.set(n, steps);
        return steps;
    }

    let totalSteps = 0;

    // すべてのクエリに対して計算を実行
    for (const n of queries) {
        // 念のため、nが1以上であることを確認（入力処理でフィルタリング済みだが念のため）
        if (n >= 1) {
            totalSteps += countSteps(n);
        }
    }

    // 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
