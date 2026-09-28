/**
 * 標準入力から整数を読み込み、与えられた操作を繰り返して1に到達するまでの手数を計算し、
 * 全ての手数の合計を求めるプログラム。
 * 計算結果をメモ化して高速化する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // メモ化テーブル
    const memo = new Map<number, number>();
    memo.set(1, 0);

    let totalCount = 0;

    for (const line of lines) {
        const n = parseInt(line, 10);

        if (isNaN(n)) {
            continue; // 整数として解釈できない行は無視
        }

        if (n < 1) {
            continue; // 1以上の整数のみを扱う
        }

        // 再帰または動的計画法で手数を計算
        let count = 0;
        let currentN = n;
        const path = new Set<number>(); // サイクル検出用

        while (currentN !== 1) {
            if (memo.has(currentN)) {
                // メモ化された値があればそこから計算を続ける
                count += memo.get(currentN) + 1;
                break;
            }

            if (path.has(currentN)) {
                // サイクルに陥った場合。この問題の操作は必ず1に収束するため、
                // サイクルは通常発生しないが、念のため。
                // サイクル内の手数は、そのサイクルで1に到達する手数を計算する際に、
                // サイクルをスキップして再帰的に処理することで解決されるべきだが、
                // ここでは単純に到達できないと見なすか、またはサイクル内の手数を考慮する必要がある。
                // この問題の操作はCollatz予想に関連しており、1に収束することが保証されている。
                // サイクル検出は、計算途中のメモ化の漏れを防ぐための補助として考える。
                // 実際には、Memoizationが正しく機能すれば、このifブロックには到達しないはず。
                break; 
            }

            path.add(currentN);

            if (currentN % 2 === 0) {
                currentN /= 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            count++;
        }
        
        // ループ終了後、現在の経路上の全ての要素のメモ化を更新する（後方参照の最適化）
        // ここでは、直接計算した結果をメモ化する。
        // サイクル検出は、特に大きな数に対して計算時間を制限するために重要になるが、
        // 厳密にはCollatzの性質上、1に収束するため、単純な再帰/メモ化で十分である。
        
        // 再計算を避けるため、上記のループで求めた結果をメモ化する
        if (currentN === 1) {
            // 1に到達したときの総ステップ数を計算し直す (もし途中でメモ化が使われていなければ)
            // 今回のループは、nから1へのパスを直接辿っているため、countが正しい手数となる。
            memo.set(n, count);
        } else if (memo.has(currentN)) {
            // 途中でメモ化された値に到達した場合、その値からnまでの手数を遡って計算し、nにセットする
            // これは、nからcurrentNへのパスが既に計算済みである場合に必要になる。
            // ただし、今回の実装では、nから直接計算した結果をmemo[n]に格納する。
            // 簡略化のため、nから1へのパスを辿った結果をmemo[n]に格納する。
            memo.set(n, count);
        } else {
             // サイクル検出やメモ化の複雑性を避けるため、再帰的なメモ化を試みる（ただし、再帰はスタックオーバーフローのリスクがあるため、ここでは反復を優先）
             // 厳密には、再帰的なメモ化が最もクリーンだが、入力サイズと計算の深さを考慮すると、
             // 逐次的なメモ化が安全。
             // ここでは、単純に計算した結果を格納する。
             memo.set(n, count);
        }


        totalCount += count;
    }

    console.log(`total=${totalCount}`);
}

solve();
