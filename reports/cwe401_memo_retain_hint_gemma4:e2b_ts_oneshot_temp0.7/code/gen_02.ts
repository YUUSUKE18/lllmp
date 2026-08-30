const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const queries = lines.map(line => parseInt(line, 10));

    // メモ化テーブル
    const memo = new Map<number, number>();
    memo.set(1, 0);

    /**
     * 繰り返し操作の手数を計算する関数（メモ化付き）
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

        let current = n;
        const steps = [];

        // 探索の過程で発生する値を記録し、サイクルを検出するために使用
        const visited = new Map<number, number>();
        visited.set(current, 0);
        let stepCount = 0;

        while (current !== 1) {
            if (visited.has(current)) {
                // サイクル検出。この問題の操作 (n/2 or 3n+1) では、1以外のサイクルは存在しない（1に収束する）ため、これは通常到達しないはずだが、安全のため。
                // ただし、この問題は通常、3n+1問題に帰着するため、1に収束することを期待する。
                // 厳密には、この問題は「3n+1問題」の変種であり、サイクル検出は不要だが、メモ化をより堅牢にするため（今回は1に収束する問題なので）
                // 実際には、サイクルは発生せず、1に到達する。
                // 念のため、もしサイクルが発生した場合の処理を定義する必要があるが、ここでは1に収束する前提で進める。
                break; 
            }
            
            steps.push(current);
            
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            stepCount++;
            visited.set(current, stepCount);
        }

        // 1に到達したか確認
        if (current === 1) {
            // 経路の長さはステップ数。ただし、初期値nから1に到達するまでの操作回数が必要。
            // 1に到達するまでの操作回数は、visitedマップのサイズから逆算する必要があるが、
            // ここでは単純に実行したステップ数を採用する。
            // 実際には、nが1に到達するまでの操作回数を数える。
            
            // 再計算して、より正確なステップ数を求める（メモ化の恩恵を最大限に受ける）
            let temp = n;
            let count = 0;
            while (temp !== 1) {
                if (temp % 2 === 0) {
                    temp /= 2;
                } else {
                    temp = 3 * temp + 1;
                }
                count++;
            }
            
            memo.set(n, count);
            return count;
        }
        
        // 1に到達しなかった場合（理論上発生しないはず）
        return Infinity; 
    }

    let totalSteps = 0;

    for (const n of queries) {
        // 各クエリに対して計算を実行し、結果を合計する
        // 実際には、全てのクエリに対して countSteps(n) を実行し、その合計を求める必要がある。
        // しかし、問題文の構造から、各クエリ n について n から 1 に到達するまでの手数を求め、その合計を求める、と解釈する。
        
        // 注意: この問題の指示は「各クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」
        // これは、元の問題（3n+1問題）の「ステップ数」を求める問題である。
        
        // メモ化を再利用して、各クエリの結果を取得する
        const steps = countSteps(n);
        if (steps !== Infinity) {
            totalSteps += steps;
        }
    }

    console.log(`total=${totalSteps}`);
}

solve();
