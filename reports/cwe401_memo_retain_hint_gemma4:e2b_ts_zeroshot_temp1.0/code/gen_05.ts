/**
 * 仕様に従い、Collatz数列の到達までの手数を計算し、その合計を求めるプログラム。
 * メモ化（動的計画法）を使用して効率化する。
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

    let totalSteps = 0;

    for (const line of lines) {
        const n = parseInt(line, 10);

        if (isNaN(n)) {
            continue;
        }

        if (n === 1) {
            // n=1の場合は既にmemoされているか、0手数なのでスキップまたは加算
            // ここでは、nがクエリとして与えられたので、その手数を加算する
            totalSteps += memo.get(n)!;
            continue;
        }

        // nがまだメモ化されていない場合、計算を開始する
        if (!memo.has(n)) {
            let current = n;
            const path: number[] = [];

            // 到達するまでの経路を辿る
            while (current !== 1) {
                path.push(current);
                if (current % 2 === 0) {
                    current /= 2;
                } else {
                    current = 3 * current + 1;
                }
            }
            // 1に到達するまでの手数はパスの長さ + 1 (最初の数 n から数えるため)
            // ただし、問題文の指示「n が 1 のときの手数は 0 です」に基づき、
            // nから1に到達する操作回数を数える。
            // 例: 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7ステップ)
            // pathの長さは1に到達するまでのステップ数なので、path.length が手数になる。
            // n=1の場合: 0 (memo済み)
            // n=2の場合: 1 (2->1)
            // n=3の場合: 7 (3->10->5->16->8->4->2->1)
            
            const steps = path.length;
            
            // 経路をメモ化に追加 (逆順で格納)
            for (let i = 0; i < path.length; i++) {
                memo.set(path[i], steps - i);
            }
        }
        
        // 計算結果を加算
        totalSteps += memo.get(n)!;
    }

    console.log(`total=${totalSteps}`);
}

solve();
