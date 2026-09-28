import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("total=0");
        return;
    }

    // 入力を整数としてパースし、空行や非数値行を無視する
    const lines = input.split('\n').filter(line => line.trim() !== '');
    const queries = lines.map(line => parseInt(line.trim(), 10));

    // メモ化テーブル: n -> 手数
    const memo = new Map<number, number>();
    memo.set(1, 0);

    /**
     * 指定された数 n が 1 に到達するまでの手数を計算する（メモ化付き）
     * @param n 始点となる整数
     * @returns 1 に到達するまでのステップ数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current = n;
        const steps = 0;

        // 1 に到達するまで繰り返す
        while (current !== 1) {
            if (memo.has(current)) {
                // 途中でメモ化された値に到達した場合、その差分を加算して終了
                const memoSteps = memo.get(current)!;
                steps += memoSteps;
                break;
            }

            if (current % 2 === 0) {
                // n が偶数なら n/2
                current /= 2;
            } else {
                // n が奇数なら 3n+1
                current = 3 * current + 1;
            }
            steps++;
        }

        // 経路上のすべてのステップをメモ化する (この実装では、計算中に発生した値をすべてメモするのではなく、
        // 最終的な結果のみをメモする方が効率的だが、ここでは再帰的なメモ化の概念を適用し、
        // 経路計算自体は最適化する)
        
        // 経路計算を再構成し、経路上のすべての値をメモする形で再実装する
        // (元の仕様では、個々のクエリ n に対して計算を行うため、ここでは n から 1 へのパスを追跡する)

        // --- 再計算ロジックの修正 ---
        // 個々のクエリ n が 1 に到達するまでのステップ数を求める（再帰的メモ化）
        let currentSteps = 0;
        let tempN = n;
        const path: number[] = []; // 経路を記録
        
        // 経路を辿りながら、どの値が既知かをチェックする
        while (tempN !== 1) {
            if (memo.has(tempN)) {
                // 既知の値に到達した場合、そこから1へのステップ数を足し合わせる
                currentSteps += memo.get(tempN)!;
                break;
            }
            
            // 経路を記録し、次のステップに進む
            path.push(tempN);

            if (tempN % 2 === 0) {
                tempN /= 2;
            } else {
                tempN = 3 * tempN + 1;
            }
            currentSteps++;
        }
        
        // 経路上のすべての値をメモに追加する
        for (const val of path) {
            memo.set(val, currentSteps - (n - val)); // 複雑になるため、単純に計算結果をメモする
        }
        
        // --- シンプルな再帰的メモ化に戻す (一般的なCollatzメモ化) ---
        
        let stepsCount = 0;
        let currentN = n;
        const pathValues: number[] = [];

        // 1に到達するまでの経路を追跡し、経路上のすべての値をメモする
        while (currentN !== 1) {
            if (memo.has(currentN)) {
                // 既知の値に到達した場合、そこから1へのステップ数を足し合わせる
                stepsCount += memo.get(currentN)!;
                break;
            }
            
            pathValues.push(currentN);

            if (currentN % 2 === 0) {
                currentN /= 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            stepsCount++;
        }
        
        // 経路上のすべての値をメモに追加する
        // (この計算は複雑になるため、ここでは一般的なDP/メモ化の形式を採用し、経路上の値のみをメモする)
        for (const val of pathValues) {
            // ここでは、経路上の値を計算し直すのではなく、最終的な結果のみをメモする方が効率的。
            // ただし、クエリごとに計算するため、この関数はあくまで「n」から「1」までのステップ数を返すことに特化する。
        }
        
        // 最終的なステップ数を返す
        memo.set(n, stepsCount);
        return stepsCount;
    }

    let totalSteps = 0;

    // すべてのクエリに対して計算と合計を行う
    for (const n of queries) {
        if (n <= 0) continue; // 1以上の整数のみを対象

        // メモ化された関数を実行
        const steps = countSteps(n);
        totalSteps += steps;
    }

    // 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
