/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から与えられた整数 n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求める。
 * n が 1 のときの手数は 0。
 * すべてのクエリの手数の合計を求める。
 * 同じ整数が繰り返し現れるので、計算結果をメモ化して高速化する。
 * 標準出力へ厳密に `total=<合計>` という 1 行を出力する。
 * Node.js で動く完全な TypeScript。
 * 
 * この問題は、Collatz予想に関連する問題であり、メモ化再帰または動的計画法を用いて効率的に解く必要があります。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("total=0");
        return;
    }

    // 入力を1行ごとに分割し、整数としてフィルタリングする
    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const queries = lines.map(line => parseInt(line, 10));

    // メモ化テーブル
    const memo: Map<number, number> = new Map();
    let totalCount = 0;

    /**
     * Collatz操作の回数を計算する関数（メモ化付き）
     * @param n 初期値
     * @returns 1 に到達するまでの手数
     */
    function collatzSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 0;
        let current = n;
        const path: number[] = []; // 経路を記録して、後でまとめてメモ化するために使用

        while (current !== 1) {
            // 経路を記録（メモ化の際に、現在の値から1に戻るまでの経路を考慮する必要があるため、ここでは単純にステップ数を数える）
            path.push(current);
            
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                // 3n + 1。64bit整数に収まることを前提とする。
                current = 3 * current + 1;
            }
            steps++;
        }

        // 経路上のすべての値について、1に戻るまでのステップ数を計算し、メモ化する
        // この問題では、特定の開始値 n から 1 への到達ステップ数を求めるため、再帰的なメモ化が最も自然。
        // ただし、操作は一方向（n -> next(n)）なので、単純な再帰で十分。
        
        // 再帰的なメモ化を再実装する
        let count = 0;
        let temp = n;
        const history: number[] = [];

        while (temp !== 1) {
            history.push(temp);
            if (temp % 2 === 0) {
                temp = temp / 2;
            } else {
                temp = 3 * temp + 1;
            }
            count++;
        }

        // 経路上の各値について、1に戻るまでのステップ数を計算し、メモ化する
        // この問題の要求は「n が 1 に到達するまでの手数」なので、単一の経路の長さが求められる。
        // ただし、メモ化の恩恵を最大限に受けるため、経路上のすべての値について、その値から1へのステップ数を計算する。
        
        // ここでは、クエリ n に対して、n から 1 へのステップ数を求める。
        // 経路上の各要素について、その要素から 1 へのステップ数を計算する。
        
        // 経路を逆順に処理して、メモ化を最適化する（ただし、これは Collatz の標準的なメモ化とは異なる）
        // 単純に、現在の n から 1 へのステップ数を計算し、その結果をメモする。
        
        memo.set(n, count);
        return count;
    }

    // すべてのクエリを処理
    for (const n of queries) {
        if (n <= 0) continue; // 1以上の整数が与えられるはずだが念のため
        
        // メモ化された結果を取得
        const steps = memo.get(n) || collatzSteps(n);
        totalCount += steps;
    }

    // 結果の出力
    console.log(`total=${totalCount}`);
}

solve();
