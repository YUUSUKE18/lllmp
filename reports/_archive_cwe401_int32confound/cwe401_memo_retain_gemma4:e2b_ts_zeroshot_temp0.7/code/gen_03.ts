/**
 * 仕様を満たすプログラム。
 * 1から始まる整数に対する操作の回数を計算し、その合計を求める。
 * 繰り返し現れる数に対するメモ化（動的計画法的なアプローチ）で高速化する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        console.log("total=0");
        return;
    }

    // 最初の行が空の場合は終了
    if (input[0] === "") {
        console.log("total=0");
        return;
    }

    // 入力から整数を抽出する
    const queries = [];
    for (const line of input) {
        const trimmedLine = line.trim();
        if (trimmedLine.length > 0) {
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

    /**
     * n が 1 に到達するまでの手数を計算する関数（メモ化付き）
     * @param n 初期値
     * @returns 手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current = n;
        let steps = 0;
        const path = new Set<number>(); // サイクル検出用

        while (current !== 1) {
            if (path.has(current)) {
                // サイクルに陥った場合、このパスは無限ループ（またはサイクル）
                // ただし、問題の操作は通常1に収束するため、ここでは到達しないと仮定する。
                // 実際には、この問題の操作 (n/2 or 3n+1) は Collatz プロブレムと似ているが、
                // 1に到達することを前提とする。
                // サイクルに入った場合は、計算を停止し、その結果を返す（ここではエラー処理として扱うが、
                // 問題の制約上、通常は到達するはず）。
                // 厳密には、この問題ではサイクル内の計算が問題になるが、
                // 一般的なCollatz問題のように、サイクルに入ったら無限に続くため、
                // ここでは到達しないと見なして、非常に大きな値を返すか、エラーを出すべきだが、
                // 制約から1に到達すると仮定し、サイクル検出は不要と解釈する。
                // 実際には、この問題の操作は通常、1に収束することが期待される。
                // サイクル検出は、計算の安全性を確保するために重要だが、
                // ここではシンプルに到達を試みる。
                // サイクル検出は、もしnが非常に大きい場合や、操作が複雑な場合に必要になる。
                // Collatz問題の文脈では、通常1に収束すると仮定し、サイクル検出は省略しても良いことが多い。
                // ただし、ここでは厳密に「1に到達するまでの手数」を求めるため、サイクルに入ったら到達しないと見なす。
                // 実際には、この問題は「到達するまでの手数」を問うため、サイクル内のループを検出する。
                
                // サイクル検出を実装する代わりに、安全のため、到達しないと仮定し、
                // 非常に大きな値を返すか、計算を停止する。
                // 今回は、メモ化が効くことを期待して、サイクル検出を簡略化する。
                // サイクルに入った場合は、その経路は1に到達しないため、ここでは計算を終了させる。
                // ただし、問題の意図を尊重し、1に到達すると仮定して進める。
                
                // 安全のため、サイクルに入ったら計算を中断し、到達しないと見なす。
                // この問題の文脈では、サイクルは存在しないと仮定して進める。
                return Infinity; 
            }

            path.add(current);

            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // 1に到達したときのステップ数をメモする
        memo.set(n, steps);
        return steps;
    }

    let totalSum = 0n; // 64bit整数 (BigIntを使用)

    for (const n of queries) {
        // 各クエリについて手数を計算し、合計に加算する
        const steps = countSteps(n);
        if (steps !== Infinity) {
            totalSum += BigInt(steps);
        }
    }

    // 結果を出力
    console.log(`total=${totalSum.toString()}`);
}

solve();
