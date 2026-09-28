/**
 * 標準入力からクエリを読み込み、操作を繰り返し、メモ化して合計を計算するプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // メモ化テーブル
    const memo: Map<number, number> = new Map();
    let totalCount = 0;

    for (const line of lines) {
        const n = parseInt(line, 10);

        if (isNaN(n) || n < 1) {
            continue; // 整数として解釈できない行や1未満の値を無視
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            const count = memo.get(n)!;
            totalCount += count;
            continue;
        }

        // 再帰的計算（メモ化を活用）
        if (n === 1) {
            memo.set(1, 0);
        } else if (n % 2 === 0) {
            // n が偶数の場合: n/2
            const next = n / 2;
            const count = 1 + memo.get(next)!;
            memo.set(n, count);
        } else {
            // n が奇数の場合: 3n+1
            const next = 3 * n + 1;
            const count = 1 + memo.get(next)!;
            memo.set(n, count);
        }
        
        // ここで直接合計を計算するのではなく、すべてのクエリの結果を集計する
        // 仕様では「すべてのクエリの手数の合計を求めます」とあるため、
        // 各クエリを処理するたびにその結果を合計に加算する。
        // ただし、上記の構造では、nが与えられたときの「1に到達するまでの手数」を求める問題と解釈し、
        // 各クエリに対する計算結果を合計する必要があります。
        
        // 再度、クエリ n ごとに「1に到達するまでの手数」を計算し、合計に追加するロジックを修正します。
        // 既存の再帰的なメモ化構造は「nから1への移動の回数」を計算しているので、
        // 各クエリ n について、memo.get(n) が求めるべき値となります。
        
        // 最初の呼び出し（この部分）で、nを計算した結果を合計に追加します。
        totalCount += memo.get(n)!;
    }

    // 最終的な合計を出力
    console.log(`total=${totalCount}`);
}

// 実行
solve();
