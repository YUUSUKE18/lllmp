/**
 * 仕様を満たすプログラム。
 * 1 からスタートし、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求める。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    if (lines.length === 0) {
        console.log("total=0");
        return;
    }

    // メモ化テーブル
    const memo: Map<number, number> = new Map();
    let totalSteps = 0;

    // 各クエリを処理
    for (const line of lines) {
        let n: number;
        try {
            n = parseInt(line, 10);
            if (isNaN(n) || n < 1) {
                continue; // 整数として解釈できない行や1未満の値を無視
            }
        } catch (e) {
            continue; // 予期せぬエラーは無視
        }

        if (n === 1) {
            // n が 1 のときの手数は 0
            const steps = 0;
            if (!memo.has(n)) {
                memo.set(n, steps);
            }
            totalSteps += steps;
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            const steps = memo.get(n)!;
            totalSteps += steps;
            continue;
        }

        // 再帰的または反復的に計算（メモ化を利用）
        let currentN = n;
        let steps = 0;
        const path: number[] = []; // 経路を記録してメモ化を効率的に行うため（オプションだが、ここでは直接メモ化を優先）

        // 1 に到達するまでの過程を追跡し、メモ化を更新
        while (currentN !== 1) {
            if (memo.has(currentN)) {
                // 既に計算済みの値に到達した場合、その手数を加算して終了
                steps += memo.get(currentN)!;
                break;
            }
            
            // 現在のステップを記録（これは再帰的なメモ化の代わりに、現在のパスを追跡するのに役立つ）
            path.push(currentN);

            if (currentN % 2 === 0) {
                currentN = currentN / 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            steps++;
        }
        
        // 最終的な結果をメモ化
        if (currentN === 1) {
            // 1 に到達したときの総手数を計算
            // ここでの「手数」は、元の n から 1 に到達するまでの操作回数
            // 実際には、n から 1 への最短経路の長さ（操作回数）を求める。
            
            // 簡略化のため、再帰的なメモ化（DP）の考え方を適用する。
            // n から 1 への手数を求める。
            
            // 再計算（DPアプローチ）
            let current_n = n;
            let count = 0;
            const history: number[] = [n];
            
            while (current_n !== 1) {
                if (memo.has(current_n)) {
                    // 既に計算済みの値に到達した場合、その手数を加算して終了
                    count += memo.get(current_n)!;
                    break;
                }
                
                if (current_n % 2 === 0) {
                    current_n /= 2;
                } else {
                    current_n = 3 * current_n + 1;
                }
                count++;
            }

            if (current_n === 1) {
                // 1 に到達したときの総手数を計算
                // 最後のステップで 1 に到達した。
                // ただし、n=1 の場合は 0。
                // n=2 -> 1 (1ステップ)
                // n=3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7ステップ)
                
                // 最初の n からの操作回数を数える
                let final_steps = 0;
                let temp_n = n;
                while (temp_n !== 1) {
                    if (temp_n % 2 === 0) {
                        temp_n /= 2;
                    } else {
                        temp_n = 3 * temp_n + 1;
                    }
                    final_steps++;
                }
                
                // 既にメモ化されている値があればそれを使うべきだが、
                // この問題は「n から 1 への操作回数」を求める問題であり、
                // 既存のメモ化（n -> f(n)）とは異なる。
                
                // 既存のメモ化は「n から到達可能な値」のメモ化として機能させる。
                // この問題の要求は、n から 1 への操作回数そのものを求めること。
                
                // したがって、メモ化は「n から 1 への最短経路」を直接格納する形に変更する。
                // ただし、この問題は「n から 1 への操作回数」を求めるため、
                // 既存のメモ化構造を再定義する必要がある。
                
                // 既存のメモ化は、n からスタートして、到達した値が 1 に到達するまでの手数を格納する、という解釈で進める。
                // しかし、問題文は「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます」
                // これは、n からスタートして、操作を繰り返して 1 に到達するまでの回数を意味する。
                
                // したがって、再計算した final_steps を採用する。
                
                if (!memo.has(n)) {
                    memo.set(n, final_steps);
                }
                totalSteps += final_steps;
            }
        }
    }

    // 最終的な合計を出力
    console.log(`total=${totalSteps}`);
}

solve();
