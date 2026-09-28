/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から整数クエリを読み込み、
 * nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1に到達するまでの手数を求める。
 * nが1のときの手数は0。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 標準出力へ `total=<合計>` を出力する。
 * 
 * 言語・形式:
 * Node.jsで動く完全なTypeScript。外部パッケージ不使用。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0 || input[0] === '') {
        console.log('total=0');
        return;
    }

    // 入力行を整数としてパースし、空行や無効な行を無視する
    const queries = [];
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
        console.log('total=0');
        return;
    }

    // メモ化テーブル
    const memo = new Map<number, number>();
    
    /**
     * 1に到達するまでの手数を再帰的に計算する関数（メモ化付き）
     * @param n 現在の数
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
        let current = n;

        // 1に到達するまで操作を繰り返す
        while (current !== 1) {
            if (current % 2 === 0) {
                // nが偶数なら n/2
                current = current / 2;
            } else {
                // nが奇数なら 3n+1
                current = 3 * current + 1;
            }
            steps++;
        }

        // 最終的な結果をメモ化
        memo.set(n, steps);
        return steps;
    }

    let totalSteps = 0;

    // 各クエリに対して計算と合計を求める
    for (const n of queries) {
        // 各クエリ n について、n から 1 に到達するまでの手数を計算する
        // 注意: 仕様の解釈として、クエリ n に対して、nを操作して1に到達するまでの手数を求める、と解釈します。
        // (元の問題のCollatz予想の文脈を考えると、nから1へのパスを数える、という解釈が自然です。)
        const steps = countSteps(n);
        totalSteps += steps;
    }

    // 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
