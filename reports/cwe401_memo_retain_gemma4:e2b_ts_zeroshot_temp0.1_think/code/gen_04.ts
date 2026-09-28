import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    if (input === "") {
        console.log("total=0");
        return;
    }

    // 入力を改行で分割し、整数としてフィルタリングする
    const lines = input.split('\n');
    const queries = [];

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine) {
            // BigIntとして読み込むことで、64bit以上の数に対応し、計算の安全性を確保する
            queries.push(BigInt(trimmedLine));
        }
    }

    // メモ化テーブル: { n: steps }
    const memo = new Map<bigint, number>();
    let totalSteps = 0;

    /**
     * Collatz操作の手数（ステップ数）を計算する関数
     * @param n 開始数 (BigInt)
     * @returns 1に到達するまでのステップ数 (number)
     */
    function countSteps(n: bigint): number {
        if (n === 1n) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current = n;
        let steps = 0;
        const path = new Map<bigint, number>(); // 現在のパスを記録するためのマップ

        while (current !== 1n) {
            // 既に計算済みの値があれば、その結果をパスに記録し、ステップ数を加算する
            if (memo.has(current)) {
                steps += memo.get(current)!;
                // 既に計算済みのパスを再利用する
                // ここで再帰的なメモ化を適用するのではなく、現在のパスを追跡する形でメモ化を適用する
                // ただし、Collatzの性質上、一度計算した値は必ず1に収束するため、再帰的なメモ化が最も効率的。
                // ここでは、現在のパスを追跡し、到達した時点でメモ化を行う。
                break; // 既にメモ化されている場合はループを抜ける
            }

            // 経路を追跡
            path.set(current, steps);

            // 操作の実行
            if (current % 2n === 0n) {
                current /= 2n;
            } else {
                // 3n + 1
                current = 3n * current + 1n;
            }
            steps++;
        }

        // 1に到達したときのステップ数を計算し、パス全体をメモ化する
        // 実際には、再帰的なメモ化が最も効率的だが、ここではイテレーションで計算し、途中の値もメモ化する。
        // ただし、問題の要求は「1に到達するまでの手数」のみなので、最終的なステップ数のみをメモ化する。
        
        // 再計算を避けるため、現在のパスを追跡し、到達した時点でメモ化する
        // (再帰的なメモ化を適用する方が、より一般的なCollatzのメモ化戦略となる)
        
        // 再度、シンプルなイテレーションでステップ数を計算し、結果をメモ化する
        let currentN = n;
        let count = 0;
        const history = new Set<bigint>(); // 経路上の値を追跡

        while (currentN !== 1n) {
            if (memo.has(currentN)) {
                // 既に計算済みの値に到達した場合、その結果を足し合わせる
                count += memo.get(currentN)!;
                break;
            }
            
            // 経路上の値を記録
            history.add(currentN);

            if (currentN % 2n === 0n) {
                currentN /= 2n;
            } else {
                currentN = 3n * currentN + 1n;
            }
            count++;
        }
        
        // 最終的な結果をメモ化
        memo.set(n, count);
        return count;
    }

    // すべてのクエリを処理する
    for (const n of queries) {
        if (n <= 0n) continue; // 1以上の整数のみを対象とする

        // 計算を実行し、合計に加算
        const steps = countSteps(n);
        totalSteps += steps;
    }

    // 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
