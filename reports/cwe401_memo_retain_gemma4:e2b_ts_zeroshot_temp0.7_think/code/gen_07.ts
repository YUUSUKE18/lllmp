import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    if (input === "") {
        console.log("total=0");
        return;
    }

    // 入力を行ごとに分割し、整数としてパースする
    const lines = input.split('\n');
    const queries: number[] = [];

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine) {
            const n = parseInt(trimmedLine, 10);
            // 1以上の整数のみをクエリとして採用
            if (!isNaN(n) && n >= 1) {
                queries.push(n);
            }
        }
    }

    // メモ化テーブル: n -> 1に到達するまでの手数
    const memo = new Map<number, number>();
    // 1のケースは手数が0
    memo.set(1, 0);

    /**
     * nから1に到達するまでの手数を計算する関数（メモ化付き）
     * @param n 開始数
     * @returns 1に到達するまでのステップ数
     */
    function calculateSteps(n: number): number {
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        // 現在のパスを追跡するためのスタックとステップ数
        const path: number[] = [n];
        let current = n;
        let steps = 0;

        // 1に到達するまで繰り返す
        while (current !== 1) {
            if (current % 2 === 0) {
                // 偶数の場合: n/2
                current /= 2;
            } else {
                // 奇数の場合: 3n+1
                // 64bit整数に収まることを前提とする
                current = 3 * current + 1;
            }
            steps++;
            path.push(current);
        }

        // 結果をメモ化
        // pathの要素数は (現在のステップ数 + 1)
        const result = steps;
        
        // パス全体をメモ化する（再計算の効率化のため）
        for (let i = 0; i < path.length; i++) {
            memo.set(path[i], result - (path.length - 1 - i));
        }
        
        // 最終的な結果をnにセット
        memo.set(n, steps);
        return steps;
    }

    let totalSteps = 0;

    // 全てのクエリに対して計算と合計を行う
    for (const n of queries) {
        const steps = calculateSteps(n);
        totalSteps += steps;
    }

    // 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
