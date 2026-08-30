/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から1以上の整数が1行に1個ずつ並ぶ（クエリ）として与えられる。
 * 各クエリ n について、nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1に到達するまでの手数を求める。
 * nが1のときの手数は0。
 * すべてのクエリの手数の合計を求める。
 * 標準出力へ厳密に `total=<合計>` という1行（末尾に改行）だけを出力する。
 * 同じ整数が繰り返し現れるので、計算結果をメモ化して高速化する。
 * 言語・形式: Node.jsで動く完全なTypeScript。process.stdinから入力を読む。外部パッケージは使わない。
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
    const memo: Map<number, number> = new Map();
    let totalCount: bigint = 0n;

    /**
     * 繰り返し操作の手数を計算する関数（メモ化付き）
     * @param n 初期値
     * @returns 1に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        // 再帰または反復で計算
        let steps = 0;
        let current = n;
        
        // 1に到達するまでのパスを追跡し、ループを防ぐためにメモ化を効率的に行う
        const path: number[] = [];
        
        while (current !== 1) {
            path.push(current);
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
        }
        
        // 1に到達するまでの手数はパスの長さ + 1 (スタートからゴールまで)
        // ただし、問題文の「手数」の定義が「操作の回数」を指すか、「パスの長さ」を指すか不明瞭だが、
        // 通常、この種の問題では「1に到達するまでの操作回数」を問う。
        // n=3 の場合: 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7回)
        // pathの長さはnから1の手順数。
        // n=1のとき0。
        // n=2のとき: 2 -> 1 (1回)
        // n=3のとき: 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7回)
        
        // ここでは、nから1に到達するまでの操作回数を求める。
        const result = path.length + 1; 
        
        // パス上のすべての要素をメモ化する（より効率的なメモ化のため）
        for (const val of path) {
            memo.set(val, result - (path.indexOf(val) + 1)); // 逆算で手数を設定するが、これは複雑すぎる。
            // シンプルに、計算した結果を現在のnにマッピングする
            // この問題は、各クエリに対して独立に計算し、その結果を合計する問題と解釈する。
            // メモ化は「同じクエリが何度も与えられた場合」に適用される。
            // ここでは、各クエリが独立しているため、再帰的なメモ化（DP）として実装する。
        }

        // 再度、標準的なDP/メモ化の構造に戻す。
        // この問題は「各クエリ n について、nが1になるまでの手数を求める」ため、
        // nが与えられたときに、そのnから1への経路を計算する。
        
        // 再帰的なメモ化を再実装する
        const stack: { n: number, count: number }[] = [{ n: n, count: 0 }];
        const visited = new Set<number>();
        
        while (stack.length > 0) {
            const { n: currN, count: currentCount } = stack.pop()!;

            if (currN === 1) {
                // 1に到達するまでの手数は currentCount
                memo.set(n, currentCount);
                break;
            }
            
            if (visited.has(currN)) continue;
            visited.add(currN);

            let nextN: number;
            if (currN % 2 === 0) {
                nextN = currN / 2;
            } else {
                nextN = 3 * currN + 1;
            }
            
            // 遷移のコストは1
            stack.push({ n: nextN, count: currentCount + 1 });
        }

        // 最終的な結果を返す（再帰的な呼び出しを避けるため、ここでは計算結果を直接返す）
        return memo.get(n) || 0; 
    }

    // すべてのクエリに対して計算と合計を行う
    for (const nStr of lines) {
        const n = parseInt(nStr, 10);
        if (isNaN(n) || n < 1) {
            continue; // 無効な入力は無視
        }

        if (!memo.has(n)) {
            // nが与えられたときの計算結果を求める
            // 実際には、上記で定義したcountSteps関数を呼び出す
            // ただし、上記の実装は複雑なため、ここでは最もシンプルなDP構造を採用する。
            
            // 簡略化: 各クエリに対して、nから1へのパスを探索する（これは非常に遅くなる可能性があるが、
            // メモ化の要件を満たすため、この構造で進める）
            
            let steps = 0;
            let current = n;
            
            // 1に到達するまでの操作回数を数える
            while (current !== 1) {
                if (current % 2 === 0) {
                    current = current / 2;
                } else {
                    current = 3 * current + 1;
                }
                steps++;
            }
            
            memo.set(n, steps);
        }
        
        // 合計に加算
        totalCount += BigInt(memo.get(n)!);
    }

    // 結果の出力
    console.log(`total=${totalCount.toString()}`);
}

solve();
