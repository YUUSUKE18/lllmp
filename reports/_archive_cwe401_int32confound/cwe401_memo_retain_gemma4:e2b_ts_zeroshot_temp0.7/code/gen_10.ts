/**
 * 仕様を満たすプログラム
 * 
 * 処理内容:
 * 標準入力から与えられたクエリ n に対して、
 * n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求める。
 * n=1 の場合は手数は 0。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 標準出力に `total=<合計>` を出力する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0 || input[0] === '') {
        console.log('total=0');
        return;
    }

    const queries = [];
    for (const line of input) {
        const trimmedLine = line.trim();
        if (trimmedLine) {
            const num = parseInt(trimmedLine, 10);
            if (!isNaN(num) && num >= 1) {
                queries.push(num);
            }
        }
    }

    // メモ化テーブル
    const memo = new Map<number, number>();
    memo.set(1, 0);

    /**
     * 1 に到達するまでの手数を再帰的に計算する関数（メモ化付き）
     * @param n 現在の数
     * @returns 1 に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 0;
        let current = n;

        // 1 に到達するまでの経路を探索する（最短経路ではない、操作を繰り返す過程の手数）
        // 問題文の解釈: n から操作を繰り返し、1 に到達するまでの「手数」を求める。
        // 通常、この種の問題は「1 に到達するまでの最小操作回数」を意味する。
        // ここでは、与えられた操作を適用し続ける過程で、1 に到達するまでのステップ数を数える。
        
        // 1 に到達するまでの過程を追跡する
        const path: number[] = [n];
        let visited = new Set<number>();
        visited.add(n);
        
        let currentN = n;
        let stepCount = 0;

        // 1 に到達するまで、またはサイクルに陥るまで繰り返す
        while (currentN !== 1) {
            if (memo.has(currentN)) {
                // メモ化された結果があれば、そこから計算を続ける
                const memoResult = memo.get(currentN)!;
                steps += memoResult;
                // 1 に到達したと見なしてループを抜ける
                break;
            }

            if (visited.has(currentN)) {
                // サイクルに陥った場合、この経路は1に到達しない（または無限ループ）
                // この問題設定では、通常、3n+1問題の文脈では1に到達すると仮定されるため、
                // サイクル検出は厳密には不要だが、ここでは到達不可として処理を中断する。
                // ただし、もし1に到達する経路が存在しないなら、その手数は定義されていないことになる。
                // ここでは、メモ化されていないサイクルは発生しないと仮定し、再帰的に進む。
                break; 
            }
            
            visited.add(currentN);
            
            if (currentN % 2 === 0) {
                currentN = currentN / 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            stepCount++;
        }

        // 最終的な結果をメモ化
        if (currentN === 1 || memo.has(currentN)) {
             // 1に到達したか、メモ化された値から計算した
            let result = 0;
            if (currentN === 1) {
                result = stepCount;
            } else if (memo.has(currentN)) {
                // 途中からメモ化された値を利用して、現在のステップ数を加算する
                result = stepCount + memo.get(currentN)!;
            } else {
                 // サイクルや到達不能な場合、この計算は失敗するが、
                 // 問題の性質上、到達可能と仮定する。
                 // ここでは、単純に到達したステップ数を返す。
                 result = stepCount;
            }
            memo.set(n, result);
            return result;
        }
        
        // サイクルなどで到達できなかった場合のフォールバック（問題の制約上、通常は発生しないはず）
        // 実際には、上記ループ内で1に到達しない限り、計算は続行され、
        // 1に到達した時点でステップ数がカウントされるべき。
        // ここでは、最も単純な解釈（n -> 1への経路の長さ）に基づき、
        // 探索過程で1に到達したときのステップ数を採用する。
        
        // 再度、よりシンプルな経路探索として実装し直す。
        // 実際、この問題は「nが1になるまでの操作回数」を求めるため、
        // 1に到達するまでの過程を辿るのが正しい。

        // 再帰的メモ化（標準的な解法）
        // この問題は、入力がクエリの集合であり、各クエリ n について「1に到達するまでの手数」を求める問題。
        // したがって、クエリごとに計算し、その合計を求めればよい。
        // メモ化は、異なるクエリ間で重複が発生した場合に役立つ。
        
        // 再帰的計算を再試行（より標準的な解法）
        const stack: { n: number, steps: number }[] = [{ n: n, steps: 0 }];
        const visitedSet = new Set<number>();
        
        while (stack.length > 0) {
            const { n: current, steps: currentSteps } = stack.pop()!;

            if (current === 1) {
                memo.set(n, currentSteps);
                return currentSteps;
            }
            
            if (visitedSet.has(current)) {
                continue; // サイクル検出
            }
            visitedSet.add(current);

            let nextN: number;
            if (current % 2 === 0) {
                nextN = current / 2;
            } else {
                nextN = 3 * current + 1;
            }
            
            stack.push({ n: nextN, steps: currentSteps + 1 });
        }
        
        // 1に到達できなかった場合（サイクルなど）
        // 問題の制約から、通常は到達可能と仮定される。
        // この場合はエラーまたは未定義だが、今回は上記ロジックで到達したと仮定する。
        // 厳密には、この関数はクエリごとに実行されるべき。
        return -1; // 到達失敗
    }

    let totalSteps = 0;

    for (const n of queries) {
        if (memo.has(n)) {
            totalSteps += memo.get(n)!;
        } else {
            // メモ化されていない場合は、再計算（ここでは再帰的なメモ化を適用）
            // 1に到達するまでの手数を計算
            
            const stack: { n: number, steps: number }[] = [{ n: n, steps: 0 }];
            const visitedSet = new Set<number>();
            let result = -1;

            while (stack.length > 0) {
                const { n: current, steps: currentSteps } = stack.pop()!;

                if (current === 1) {
                    result = currentSteps;
                    break;
                }
                
                if (visitedSet.has(current)) {
                    continue;
                }
                visitedSet.add(current);

                let nextN: number;
                if (current % 2 === 0) {
                    nextN = current / 2;
                } else {
                    nextN = 3 * current + 1;
                }
                
                stack.push({ n: nextN, steps: currentSteps + 1 });
            }

            if (result !== -1) {
                memo.set(n, result);
                totalSteps += result;
            } else {
                // 非常に稀だが、到達できなかった場合
                // この場合、問題の仕様から矛盾が生じるため、エラー処理が必要だが、
                // 今回は合計を求めよという指示に従い、到達可能と仮定して進める。
            }
        }
    }

    console.log(`total=${totalSteps}`);
}

solve();
