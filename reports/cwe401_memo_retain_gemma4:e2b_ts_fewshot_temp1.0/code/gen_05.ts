const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    if (lines.length === 0) {
        console.log("total=0");
        return;
    }

    const queries = lines.map(line => parseInt(line, 10));

    // メモ化のためのマップ
    const memo = new Map<number, number>();
    memo.set(1, 0);

    /**
     * 操作を繰り返し、1に到達するまでの手数を計算する関数
     * @param n 開始数
     * @returns 1に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        // 遷移ルール
        let steps = 0;
        let current = n;
        
        // 3n+1問題の計算を試みる（Collatz conjecture）
        while (current !== 1) {
            if (memo.has(current)) {
                // 既に計算済みの値に到達した場合、その結果を遡って加算する
                const knownSteps = memo.get(current)!;
                // n -> current へのステップ数を計算するために、逆操作が必要になるため、
                // ここでは単純な再帰/反復計算とメモ化を組み合わせる。
                // 最も簡単なのは、スタートから1を計算し、その経路を記録すること。
                // 今回は、問題の要求に従い、与えられた操作を繰り返し適用して1に到達するまでの手数を数える。
                
                // メモ化された値を直接利用して、現在の計算を高速化する（経路の記録が必要になるため、ここでは再計算で進める）
            }
            
            if (current % 2 === 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;

            // 安全策：無限ループや非常に大きな値のチェック（ここでは64bit範囲を想定）
            // 実際には、64bit整数に収まる範囲で計算を続ける。
        }
        
        // 経路のメモ化を修正:
        // nから1までの経路を計算し、その中間値をメモ化する
        // 再帰的に計算する方がメモ化が容易になるため、memoizeを再構成する。
        
        // 再度、メモ化を修正して、nから1までの計算を直接行う
        // すでに計算済みのものがある場合、それを利用する
        
        // ただし、本問題は「nが1に到達するまでの手数」を求めるため、
        // nから1への経路を計算する標準的なCollatz問題の解法を採用する。
        
        // 現在の関数は、この問題の文脈では直接使用せず、メインループで計算を総和する方針に変更する。
        return -1; // この関数は使用しない
    }

    let totalSum = 0;
    const finalMemo = new Map<number, number>();
    finalMemo.set(1, 0);

    for (const n of queries) {
        if (n <= 0) continue;

        let steps = 0;
        let current = n;
        const path: number[] = [];

        // nから1への経路を計算
        while (current !== 1) {
            path.push(current);
            if (current % 2 === 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
        }
        path.push(1);
        
        // 経路の長さ（手数）を計算
        steps = path.length - 1;
        
        // 経路上のすべての値のメモ化を更新
        for (let i = 0; i < path.length; i++) {
            finalMemo.set(path[i], i); // path[i]に到達するまでのステップ数を i とする
        }
        
        totalSum += steps;
    }

    console.log(`total=${totalSum}`);
}

solve();
