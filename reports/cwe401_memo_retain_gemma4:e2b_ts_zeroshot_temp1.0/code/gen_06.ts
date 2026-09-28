/**
 * 仕様を満たすプログラム。
 * ヨーハン・ハルトマンの問題（3n+1問題）の逆操作をメモ化して高速化する。
 */

function solve() {
    const fs = require('fs');

    // 標準入力から全データを読み込む
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    // 入力行を処理する
    let totalMoves = 0;
    const memo = new Map<number, number>();

    for (const line of input) {
        // 空行や数値として解釈できない行を無視する
        const nStr = line.trim();
        if (nStr === "") {
            continue;
        }

        const n = parseInt(nStr, 10);

        // 整数として解釈できない場合は無視 (仕様に従う)
        if (isNaN(n)) {
            continue;
        }

        // 終了条件: n=1 のときの手数は 0
        if (n === 1) {
            // memo[1] は 0 を意味するが、再帰的な計算で 1 に到達するまでのステップ数を求めるため、
            // 実際には 1 から 1 に戻るまでの経路を考える。
            // ここでは n から 1 に到達するステップ数を求めるため、n=1 は 0 ステップ。
            if (!memo.has(1)) {
                memo.set(1, 0);
            }
            totalMoves += 0;
            continue;
        }

        // メモ化された値があればそれを使用する
        if (memo.has(n)) {
            totalMoves += memo.get(n)!;
            continue;
        }

        // 再帰/メモ化再帰で計算を試みる (ゴール: 1 に到達するまでの最小手数を求める)
        // 3n+1問題の逆操作:
        // n が偶数なら n/2
        // n が奇数なら 3n+1 (この問題では逆操作なので 3n+1 ではなく 3n-1 への逆操作を考えるべきだが、
        // ここでは問題文の操作を逆向きに適用するのではなく、n から 1 に到達するまでの「手数」を求める。)

        // 問題文の操作:
        // n が偶数なら n/2
        // n が奇数なら 3n+1
        // この操作が「n から 1 に到達するまでの手数」を求める問題（3n+1問題）とは逆方向であるため、
        // ここでは $n \to \text{next\_state}$ の過程で、最小の手数を見つけるように再帰的に探索する。

        // ただし、仕様は「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めよ」
        // これは $n$ から $1$ へのパスを求めることを意味する。

        let moves = 1 + (n % 2 === 0 ? solve(n / 2) : solve(3 * n + 1));

        // 適切なメモ化戦略（動的計画法/再帰）を適用する。
        // ただし、3n+1問題は通常、最小値を求める問題であり、この問題は特定の操作を繰り返すパスの長さを求めている。
        // 探索が無限ループしないか、メモ化が機能するかを保証する必要がある。

        // 逆操作を考える方が、この問題の「手数を求める」意図に合致する。
        // n から 1 への最短経路を求める。
        
        // 逆操作:
        // n が 1 のとき、0 ステップ。
        // n が偶数 ($n/2$) から来た場合: $n \times 2$
        // n が奇数 ($3k+1$) から来た場合: $(n-1)/3$ (ただし $n \equiv 1 \pmod 3$ の場合)

        // ここでは、与えられた操作をそのまま適用する、という指示なので、メモ化再帰で実現する。
        // ただし、再帰が深くなりすぎる可能性があるため、Memoizationは必須。

        const result = calculateMoves(n, memo);
        if (result !== undefined) {
            totalMoves += result;
            memo.set(n, result);
        }
    }

    // 最終結果の出力
    console.log(`total=${totalMoves}`);
}

/**
 * メモ化再帰関数: n から 1 に到達するまでの手数を計算する。
 * @param n 現在の数
 * @param memo メモ化テーブル
 * @returns n から 1 への手数。到達不可能なら undefined
 */
function calculateMoves(n: number, memo: Map<number, number>): number | undefined {
    if (n === 1) {
        return 0;
    }
    if (memo.has(n)) {
        return memo.get(n)!;
    }

    let result;

    if (n % 2 === 0) {
        // n が偶数なら n/2 に置き換える
        // n -> n/2 の経路を考える。
        result = calculateMoves(n / 2, memo);
        if (result !== undefined) {
            memo.set(n, 1 + result);
            return 1 + result;
        }
    } else {
        // n が奇数なら 3n+1 に置き換える
        // n -> 3n+1 の経路を考える。
        result = calculateMoves(3 * n + 1, memo);
        if (result !== undefined) {
            memo.set(n, 1 + result);
            return 1 + result;
        }
    }
    
    // 到達不可能（無限ループや意図しない遷移）の場合
    return undefined;
}

// 実行
solve();
