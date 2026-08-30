/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力からクエリを受け取り、Collatz予想（3n+1問題）の解法をメモ化して高速化し、
 * 各クエリの到達までの手数を合計する。
 * 
 * 入力: 標準入力から1以上の整数が1行に1個ずつ与えられる。
 * 操作:
 * - nが偶数なら n/2
 * - nが奇数なら 3n+1
 * 1に到達するまでの手数を求める。1の場合は0手。
 * 
 * 出力: 厳密に `total=<合計>` を出力する。
 * 
 * 実装詳細:
 * - メモ化 (Memoization) を使用して計算を高速化する。
 * - 64bit整数で収まることを想定する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0 || input[0] === "") {
        console.log("total=0");
        return;
    }

    // 最初の行から整数を抽出
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
    memo.set(1, 0); // ベースケース: 1の手数は0

    /**
     * Collatz操作を再帰的に計算し、メモ化する関数
     * @param n 現在の数
     * @returns 1に到達するまでの手数
     */
    function collatzSteps(n: number): number {
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current = n;
        const steps = 0;

        // 1に到達するまで計算
        while (current !== 1) {
            if (memo.has(current)) {
                // 途中の値がメモ化されていれば、その結果を足し合わせる
                const memoResult = memo.get(current)!;
                steps += memoResult;
                // 再帰呼び出しの代わりに、現在のステップ数を更新し続ける
                // ただし、この問題の仕様は「nから1に到達するまでの手数」なので、
                // 遷移ごとに手数を加算するのではなく、現在のnから1へのパスの長さを求める必要がある。
                // ここでは、通常のCollatzのステップ数を求めるロジックに戻す。
                // nから1へのパスの長さ = 1 + collatzSteps(次の値)
                break; 
            }
            
            // 遷移を追跡するために、現在のパスのステップ数を保持する
            let tempN = current;
            let pathSteps = 0;
            
            while (tempN !== 1) {
                if (memo.has(tempN)) {
                    // メモ化された値が見つかった場合、そこから1への手数を加算
                    pathSteps += memo.get(tempN)!;
                    // 現在のパスを終了し、結果を返す
                    memo.set(n, pathSteps);
                    return pathSteps;
                }
                
                // 遷移
                if (tempN % 2 === 0) {
                    tempN /= 2;
                } else {
                    tempN = 3 * tempN + 1;
                }
                pathSteps++;
            }
            
            // ループが終了した場合は1に到達した（これは上記while(current !== 1)の条件で既にカバーされているはずだが、念のため）
            if (current === 1) {
                memo.set(n, pathSteps);
                return pathSteps;
            }
            
            // ここでロジックが複雑になるため、標準的な再帰的なメモ化（DFS）を採用する方が安全。
            // 仕様は「nが偶数ならn/2、奇数なら3n+1を繰り返し、1に到達するまでの手数を求める」なので、
            // これは「nから1への最短パスの長さ」を求める問題である。
            
            // 再帰的なメモ化に戻る
            let currentN = n;
            let count = 0;
            const path: number[] = [];

            while (currentN !== 1) {
                path.push(currentN);
                if (currentN % 2 === 0) {
                    currentN /= 2;
                } else {
                    currentN = 3 * currentN + 1;
                }
            }
            
            // 1に到達したときのステップ数を計算
            let totalSteps = 0;
            for (const node of path) {
                totalSteps++;
            }
            
            // 戻り値の計算（この方法はメモ化の恩恵を受けにくい）
            // 結局、メモ化を最大限に活かすためには、各nに対して再帰的に計算し、途中結果を保持する必要がある。
            // 既存のmemo化構造を維持し、再帰で再計算を避ける方針で再定義する。
            
            // --------------------------------------------------------------------
            // 再帰的なメモ化による正しい実装
            // --------------------------------------------------------------------
            return calculateStepsRecursive(n);
        }
    }

    /**
     * 再帰的でメモ化されたCollatzステップ計算関数
     * @param n 開始値
     * @returns 1への手数
     */
    function calculateStepsRecursive(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let nextN: number;
        if (n % 2 === 0) {
            nextN = n / 2;
        } else {
            nextN = 3 * n + 1;
        }

        // 再帰呼び出し
        const steps = 1 + calculateStepsRecursive(nextN);

        // メモ化
        memo.set(n, steps);
        return steps;
    }

    let totalSum = 0n; // 64bit整数を想定してBigIntで初期化（合計値は64bitに収まるが、安全のため）

    // すべてのクエリに対して計算と合計を求める
    for (const n of queries) {
        // 計算結果を取得
        const steps = calculateStepsRecursive(n);
        // 合計に加算
        totalSum += BigInt(steps);
    }

    // 結果を出力
    console.log(`total=${totalSum.toString()}`);
}

solve();
