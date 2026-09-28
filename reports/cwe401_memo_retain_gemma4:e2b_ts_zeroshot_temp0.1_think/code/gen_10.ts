import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("total=0");
        return;
    }

    // 入力を改行で分割し、整数としてフィルタリングする
    const lines = input.split('\n');
    const queries: number[] = [];

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine) {
            // 整数として解釈できるか試みる
            const n = Number(trimmedLine);
            if (!isNaN(n) && n >= 1) {
                queries.push(n);
            }
        }
    }

    // メモ化テーブル: { n: steps }
    const memo = new Map<number, number>();
    let totalSteps = 0;

    /**
     * 指定された数 n から 1 に到達するまでの手数を計算する。
     * メモ化を利用する。
     * @param n 開始数
     * @returns 手数
     */
    function calculateSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current = n;
        const path: number[] = []; // 経路を記録する

        // 1 に到達するまで繰り返す
        while (current !== 1) {
            // 経路を記録し、途中の値が既に計算済みかチェックする
            if (memo.has(current)) {
                // 既に計算済みの値に到達した場合、その結果を遡って加算する
                const stepsFromCurrent = memo.get(current)!;
                // 現在のステップ数 = (現在のステップ数) + (現在の値から1までのステップ数)
                const steps = path.length + stepsFromCurrent;
                
                // 経路を遡って、まだ記録されていない中間値をメモ化する
                for (let i = path.length - 1; i >= 0; i--) {
                    const intermediate = path[i];
                    if (!memo.has(intermediate)) {
                        memo.set(intermediate, steps - (path.length - i));
                    }
                }
                return steps;
            }

            path.push(current);

            // Collatz操作
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                // 3n + 1
                current = 3 * current + 1;
            }
        }

        // 1 に到達した場合、経路全体をメモ化する
        const steps = path.length;
        for (let i = 0; i < path.length; i++) {
            memo.set(path[i], steps - i);
        }
        
        return steps;
    }

    // すべてのクエリに対して計算と合計を行う
    for (const n of queries) {
        const steps = calculateSteps(n);
        totalSteps += steps;
    }

    // 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
