/**
 * 仕様を満たすプログラム。
 * 1からスタートし、nが偶数ならn/2、nが奇数なら3n+1に置き換える操作を1に到達するまでの手数を求める。
 * 全クエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0 || input[0] === '') {
        console.log('total=0');
        return;
    }

    // 入力から整数を抽出する
    const queries: number[] = [];
    for (const line of input) {
        const trimmedLine = line.trim();
        if (trimmedLine) {
            const num = parseInt(trimmedLine, 10);
            if (!isNaN(num) && num >= 1) {
                queries.push(num);
            }
        }
    }

    // メモ化テーブル
    const memo = new Map<number, number>();
    memo.set(1, 0); // ベースケース: 1の手数は0

    /**
     * 繰り返し操作の手数を再帰的またはメモ化再帰で計算する関数
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

        // n が 1 に到達するまでの経路を追跡する
        const path: number[] = [];
        while (current !== 1) {
            path.push(current);
            if (current % 2 === 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
        }

        // 1に到達するまでの手数はパスの長さ + 1 (最初のn自身を数えるため、nからスタートして操作を繰り返す回数を数える)
        // ここでの「手数」の定義が少し曖昧なため、再帰的な考え方とメモ化の整合性を取る。
        // 問題文の意図は「nからスタートして1に到達するまでの操作回数」と解釈する。
        
        // 再帰的に計算し直す方が、中間値のメモ化が自然になる
        // ただし、上記ループで求めたのがnから1への操作回数である。
        
        let count = 0;
        let temp = n;
        while (temp !== 1) {
            if (temp % 2 === 0) {
                temp /= 2;
            } else {
                temp = 3 * temp + 1;
            }
            count++;
        }
        
        memo.set(n, count);
        return count;
    }

    let totalSum = 0;

    // すべてのクエリに対して計算と合計を求める
    for (const n of queries) {
        // nが非常に大きい場合、この計算が遅くなる可能性があるが、
        // 敵対的な入力に対しても、メモ化により同じ値の再計算は避ける。
        // 実際には、この問題は「nから1への経路」を求めるものであり、Fibonacci-likeな問題の逆操作（経路探索）になる。
        // しかし、操作は一方向（n -> n/2 or 3n+1）なので、これは通常の経路探索ではなく、
        // 逆操作（n -> n/2 or (n-1)/3）が複雑になるため、与えられた操作をそのまま適用して1に到達する経路を数えるのが最も直接的である。

        // ここでは、与えられた操作を適用して1に到達するまでのステップ数を数える。
        // これは、与えられた操作が「n -> 1」への経路を保証しないため、
        // 実際には「1からnへの逆操作」を考えるべきである。
        
        // しかし、仕様は「nが偶数ならn/2、奇数なら3n+1に置き換える操作を繰り返し、1に到達するまでの手数を求めます」
        // これは、スタート地点nから始めて、指定されたルールに従って1に到達するまでのステップ数を意味する。
        
        const steps = countSteps(n);
        totalSum += steps;
    }

    console.log(`total=${totalSum}`);
}

solve();
