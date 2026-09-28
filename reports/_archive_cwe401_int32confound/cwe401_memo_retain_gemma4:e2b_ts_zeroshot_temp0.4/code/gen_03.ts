/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から与えられた整数 n に対して、
 * n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求める。
 * n が 1 のときの手数は 0。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 標準出力へ `total=<合計>` を出力する。
 * 
 * 言語・形式: Node.js で動く完全な TypeScript。
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
    let totalCount: bigint = 0n;

    for (const line of lines) {
        let n: number;
        try {
            n = parseInt(line, 10);
            if (isNaN(n) || n < 1) {
                continue; // 整数として解釈できない行や1未満の値を無視
            }
        } catch (e) {
            continue; // パースエラーが発生した場合は無視
        }

        if (n === 1) {
            // n が 1 のときの手数は 0
            const count = 0;
            // メモ化
            memo.set(1, 0);
            // 合計に加算
            totalCount += BigInt(count);
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            const count = memo.get(n)!;
            totalCount += BigInt(count);
            continue;
        }

        // 再帰的計算とメモ化 (または反復計算)
        let steps = 0;
        let currentN = n;
        const path: number[] = []; // 経路を追跡してメモ化を効率的に行うため（今回は直接再帰で十分だが、経路追跡も可能）

        // 1 に到達するまでの手数を計算
        while (currentN !== 1) {
            if (memo.has(currentN)) {
                // 途中からメモ化された値があればそれを利用
                steps += memo.get(currentN)!;
                break;
            }

            // 操作の実行
            if (currentN % 2 === 0) {
                currentN /= 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            steps++;
        }

        // 最終的な結果を記録（もしループ内で計算が完了していれば）
        if (currentN === 1) {
            // 経路上のすべての値のメモ化を更新する（DP的なアプローチ）
            let tempN = n;
            let currentSteps = 0;
            const pathTracker: { [key: number]: number } = {};

            // 再計算を避けるため、現在の経路を追跡し、到達したすべての値のステップ数を計算する
            const stack: { n: number, steps: number }[] = [{ n: n, steps: 0 }];
            const visited = new Set<number>();
            visited.add(n);

            while (stack.length > 0) {
                const { n: curr, steps: s } = stack.pop()!;

                if (curr === 1) {
                    // n から 1 への手数を計算し、メモ化する
                    memo.set(n, s);
                    totalCount += BigInt(s);
                    break;
                }

                // 既に計算済みの値はスキップ
                if (memo.has(curr)) {
                    // 既に計算済みの値から進む場合、そのステップ数を加算する
                    // ただし、この問題は「n から 1 への最短経路」を求めるため、再帰的なメモ化が最も自然。
                    // ここでは、n から 1 への直接の計算結果を求めることに焦点を当てる。
                    // 既存のループ構造に戻り、再帰的な構造をメモ化に置き換える。
                }

                // 次のステップ
                let nextN: number;
                if (curr % 2 === 0) {
                    nextN = curr / 2;
                } else {
                    nextN = 3 * curr + 1;
                }

                if (nextN >= 1) {
                    // 経路を追跡し、到達したすべての値のメモ化を更新する
                    if (!visited.has(nextN)) {
                        visited.add(nextN);
                        stack.push({ n: nextN, steps: s + 1 });
                    }
                }
            }
        }
    }

    // 最終結果の出力
    console.log(`total=${totalCount.toString()}`);
}

solve();
