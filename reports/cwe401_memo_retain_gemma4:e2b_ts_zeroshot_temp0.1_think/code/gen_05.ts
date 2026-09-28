import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    if (input === "") {
        console.log("total=0");
        return;
    }

    // 入力をスペースや改行で分割し、整数としてフィルタリングする
    const numbers = input.split(/\s+/).map(s => parseInt(s, 10)).filter(n => !isNaN(n) && n >= 1);

    // メモ化テーブル: { n: steps }
    const memo = new Map<number, number>();
    let totalSteps = 0;

    /**
     * Collatz操作の手数数を計算する関数（メモ化付き）
     * @param n 開始値
     * @returns 1に到達するまでの手数数
     */
    function calculateSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current = n;
        let steps = 0;
        
        // 経路を追跡し、メモ化のために中間結果を保存する
        const path: number[] = [];

        while (current !== 1) {
            // 既に計算済みの値に到達した場合、その結果を利用してステップ数を加算する
            if (memo.has(current)) {
                steps += memo.get(current)!;
                // 現在の経路を記録し、現在のステップ数を更新
                for (let i = path.length; i < memo.get(current)!; i++) {
                    path.push(path[i]);
                }
                // 経路をリセットし、現在のステップ数で計算を続ける
                current = 1; // 終了
                break;
            }

            path.push(current);

            // Collatz操作
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                // 3n + 1
                current = 3 * current + 1;
            }
            steps++;
        }

        // 1に到達したときのステップ数をメモ化する
        // 注意: この実装では、経路全体を追跡してメモ化するのではなく、
        // 経路上の各要素が1に到達するまでのステップ数を計算し、それをNに紐づける必要がある。
        // シンプルな再帰的メモ化（DP）が最も効率的。
        
        // --- 再度、より標準的なDP/メモ化アプローチを採用 ---
        
        // 経路を再計算し、メモ化する
        let currentN = n;
        let currentSteps = 0;
        const history: number[] = [];

        while (currentN !== 1) {
            if (memo.has(currentN)) {
                currentSteps += memo.get(currentN)!;
                // 既に計算済みの値に到達した場合、その結果を現在のステップ数に加算して終了
                break;
            }
            
            history.push(currentN);

            if (currentN % 2 === 0) {
                currentN /= 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            currentSteps++;
        }
        
        // 経路上の全ての要素のステップ数をメモ化する
        // これは、Nから1への経路上の各要素が1に到達するまでのステップ数を計算するのではなく、
        // Nから1への経路の長さ L(N) を求める問題なので、Nのみをメモ化する。
        
        // 最終的なステップ数をメモ化
        memo.set(n, currentSteps);
        return currentSteps;
    }

    // すべてのクエリに対して計算と合計を行う
    for (const n of numbers) {
        if (n >= 1) {
            // calculateSteps関数内でメモ化と計算を行う
            const steps = calculateSteps(n);
            totalSteps += steps;
        }
    }

    // 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
