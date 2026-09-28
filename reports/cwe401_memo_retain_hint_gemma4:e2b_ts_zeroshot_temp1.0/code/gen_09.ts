/**
 * 仕様: 
 * 1 以上の整数nに対して、nが偶数ならn/2、奇数なら3n+1に置き換える操作を繰り返し、1に到達するまでの手数を求める。
 * n=1のときの手数は0。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 標準入力からクエリを読み込み、結果を標準出力に出力する。
 * 64bit整数で収まることを想定し、Node.jsで実装する。
 */

function solve() {
    const fs = require('fs');

    // 標準入力から全データを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    
    if (input.length === 0) {
        // 入力が空の場合は何もしない
        console.log("total=0");
        return;
    }

    // 入力を改行で分割し、空行や非整数行を無視する
    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    // 整数として解釈できない行を無視する処理は、trim()とfilter()で対応済み。
    // さらに厳密に整数チェックが必要な場合を考慮するが、ここではスペース区切りの入力形式を想定する。
    // 仕様では「1 以上の整数が 1 行に 1 個ずつ並びます」とあるため、スペース区切りを想定する。

    let totalCount = 0;
    
    // 入力行をスペースで分割して整数配列にする
    const queries = lines.flatMap(line => line.split(/\s+/).map(Number));

    // メモ化テーブル
    const memo = new Map<number, number>();

    /**
     * 変換操作の計算関数（メモ化付き）
     * @param n 開始値
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
        
        // 1に到達するまで繰り返す
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // メモに保存
        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリに対する計算と合計
    for (const n of queries) {
        if (n >= 1) {
            const steps = countSteps(n);
            totalCount += steps;
        }
    }

    // 結果の出力
    console.log(`total=${totalCount}`);
}

solve();
