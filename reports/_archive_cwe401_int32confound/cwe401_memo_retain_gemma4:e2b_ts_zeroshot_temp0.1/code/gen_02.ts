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
 * Node.jsで動作する完全なTypeScript。
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

    for (const line of lines) {
        let n: number;
        try {
            n = parseInt(line, 10);
            if (isNaN(n) || n < 1) {
                continue; // 整数として解釈できない行や1未満の数は無視
            }
        } catch (e) {
            continue; // エラーが発生した場合は無視
        }

        if (n === 1) {
            // nが1のときの手数は0
            const count = 0;
            memo.set(1, count);
            totalCount += BigInt(count);
            continue;
        }

        // 再帰的または反復的に計算し、メモ化を利用する
        let steps = 0;
        let currentN = n;
        const path: number[] = []; // 経路を記録してメモ化を効率的に行うため

        while (currentN !== 1) {
            if (memo.has(currentN)) {
                // メモ化された値があれば、そこから計算を続ける
                steps += memo.get(currentN);
                // 経路を遡って、現在のnから1までのステップ数を計算し、メモ化を更新する
                // ただし、この問題は「nから1に到達するまでの手数」を求めるため、
                // 遷移の過程でステップ数を加算していくのが最も直接的。
                // ここでは、nから1への最短経路（手数）を求めるため、再帰的なメモ化（DP）が適切。
                // 遷移の過程でステップ数を加算するのではなく、DPで直接計算する。
                break; // DPアプローチに切り替える
            }
            
            path.push(currentN);
            
            if (currentN % 2 === 0) {
                currentN = currentN / 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            steps++;
        }

        // DPによる再計算とメモ化（より確実な方法）
        // 1からnまでの手数を計算する
        const dp: Map<number, number> = new Map();
        dp.set(1, 0);

        for (let i = 2; i <= n; i++) {
            let steps_i = Infinity;
            let current = i;
            let count = 0;
            
            // iから1への経路を探索
            // この問題は「nから1への手数」を求めるため、iをスタートとして逆向きに考えるのではなく、
            // 遷移をたどって1に到達するまでのステップ数を求めるのが自然。
            // したがって、nから1への経路をたどる（再帰/メモ化）が最適。
            
            // 既存のメモ化を利用して、nから1への経路を計算する
            let tempN = n;
            let currentSteps = 0;
            const visited: Set<number> = new Set();
            
            while (tempN !== 1) {
                if (memo.has(tempN)) {
                    currentSteps += memo.get(tempN);
                    break;
                }
                if (visited.has(tempN)) {
                    // サイクル検出（この問題では発生しないはずだが念のため）
                    break;
                }
                visited.add(tempN);

                if (tempN % 2 === 0) {
                    tempN = tempN / 2;
                } else {
                    tempN = 3 * tempN + 1;
                }
                currentSteps++;
            }
            
            if (tempN === 1) {
                // 1に到達した場合、その経路のステップ数を計算し、メモ化する
                // このアプローチは、nが非常に大きい場合に計算時間が問題になる可能性があるため、
                // 実際にはnが小さい範囲で計算されることを前提とする。
                memo.set(n, currentSteps);
                totalCount += BigInt(currentSteps);
            } else {
                // 1に到達しなかった場合（理論上は発生しないはず）、エラーまたは無視
                // この問題の性質上、必ず1に到達する（Collatz conjecture）。
            }
        }
    }

    // 最終的な合計を出力
    console.log(`total=${totalCount.toString()}`);
}

solve();
