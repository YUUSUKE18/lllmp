const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (input === "") {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    let totalCount = 0n;
    const memo = new Map<number, bigint>();

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n)) continue;

        if (n === 1) {
            // 手数は 0
            // 1はすでにmemoに存在しないか、存在しても0なのでスキップ
            if (!memo.has(1)) {
                memo.set(1, 0n);
            }
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            const count = memo.get(n)!;
            totalCount += count;
            continue;
        }

        // 再帰/DPで計算
        let steps = 0n;
        let current = n;
        const path = [];
        
        while (current !== 1) {
            path.push(current);
            if (current % 2 === 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
        }
        
        // 1に到達するまでのステップ数はパスの長さ + 1 (最後の1のステップ)
        // ただし、問題の定義は「操作を繰り返して1に到達するまでの手数」なので、
        // n=1の手数は0。n>1の手数は、nから始めて1に到達するまでの操作回数。
        // ここでは、nを1に到達させるまでの操作回数を数える。
        // 例: n=3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7回)
        // n=1 -> 0回
        
        // 実際の操作回数を計算し直す (DP/メモ化の構造に合わせるため、再帰的な構造をメモ化に適用)
        // ここでは、nから1に到達するまでの操作回数を直接計算する
        // 実際には、nがFibonacciの問題に似ているため、単純なループで計算する。
        
        let count = 0n;
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
        totalCount += count;
    }

    console.log(`total=${totalCount.toString()}`);
}

solve();
