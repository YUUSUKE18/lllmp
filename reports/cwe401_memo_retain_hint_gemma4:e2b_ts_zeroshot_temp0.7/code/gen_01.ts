/**
 * 仕様に基づき、ユークリッドの互除法に関連する操作の回数を計算し、その合計を求めるプログラム。
 * メモ化を使用して高速化する。
 */

function solve() {
    const fs = require('fs');

    // 標準入力から全データを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("total=0");
        return;
    }

    // 入力を1行ごとに分割し、整数としてパースする
    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const queries = [];
    for (const line of lines) {
        const num = parseInt(line, 10);
        if (!isNaN(num) && num >= 1) {
            queries.push(num);
        }
    }

    // メモ化テーブル
    const memo = new Map<number, number>();
    memo.set(1, 0);

    /**
     * 繰り返し操作の手数を再帰的に計算し、メモ化する関数。
     * @param n 現在の数
     * @returns 1 に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        if (n === 1) {
            return 0;
        }

        let steps: number;
        if (n % 2 === 0) {
            // n が偶数なら n/2
            steps = countSteps(n / 2) + 1;
        } else {
            // n が奇数なら 3n+1
            steps = countSteps(3 * n + 1) + 1;
        }

        // メモ化
        memo.set(n, steps);
        return steps;
    }

    let totalSteps = 0;

    // 各クエリに対して計算を実行し、合計を求める
    for (const n of queries) {
        // 注意: 問題文の操作は、nが偶数ならn/2、奇数なら3n+1の操作を繰り返す。
        // この操作が「1に到達するまでの手数」を求める、という点に注意が必要。
        // 通常、この問題は「3n+1問題 (Collatz conjecture)」のステップ数を問うものであり、
        // 1に到達するまでのステップ数を数える。
        // 
        // 仕様の解釈:
        // nが偶数なら n/2
        // nが奇数なら 3n+1
        // 1に到達するまでの手数を求める。
        // 
        // ここで、操作を繰り返すのではなく、単一の経路を辿って1に到達するまでのステップ数を数える。
        // 
        // 仕様を再解釈すると、これは「nを操作し続け、1に到達するまでに何回操作したか」を意味する。
        // n=1 のときの手数は 0。
        // n=2 の場合: 2 -> 1 (1ステップ)
        // n=3 の場合: 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7ステップ)
        
        // 再帰関数 countSteps(n) は、nから開始して1に到達するまでのステップ数を計算している。
        const steps = countSteps(n);
        totalSteps += steps;
    }

    // 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
