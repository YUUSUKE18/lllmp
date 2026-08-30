/**
 * 仕様に基づき、Collatz数列のステップ数を計算し、その合計を求めるプログラム。
 * メモ化（動的計画法）を使用して高速化する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0 || input[0] === '') {
        console.log("total=0");
        return;
    }

    // 1行目は無視される可能性があるため、数値として解析可能な行のみを処理する
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

    if (queries.length === 0) {
        console.log("total=0");
        return;
    }

    // メモ化テーブル (Map<number, number>)
    const memo = new Map<number, number>();

    /**
     * Collatz数列の手数数を計算する関数 (メモ化付き)
     * @param n 初期値
     * @returns 手数数
     */
    function collatz_steps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current = n;
        const steps = 0;

        // 1に到達するまで繰り返す
        while (current !== 1) {
            if (!memo.has(current)) {
                // 現在のステップ数を初期化（もし再帰で深くネストする場合に備えて）
                // 今回はイテレーションで行うため、stepsは現在の遷移数として扱いたいが、
                // Memo化のために、現在の値からの残りステップを計算する方針に変更する。
                // より単純に、nから1までのステップを直接数える。
            }
            
            // 1ステップ進める
            if (current % 2 === 0) {
                current /= 2;
            } else {
                // 3n + 1。64bit整数に収まることを前提とする。
                // JavaScriptのNumber型はIEEE 754倍精度であり、安全な整数演算は2^53まで。
                // 問題文の指示に従い、64bit整数（安全に扱える範囲）内で計算を続ける。
                current = 3 * current + 1;
            }
            steps++;
        }
        
        // 遷移後の計算結果をメモ化する
        memo.set(n, steps);
        return steps;
    }

    // -------------------------------------------------------------------
    // メモ化を利用した計算の再実装 (より効率的な動的計画法)
    
    // 全てのクエリに対して計算を行う前に、必要な値を全て計算しておく（または計算実行時にメモ化を利用する）
    // 今回は、各クエリごとにメモ化を利用しつつ、再計算を避ける。

    let total_steps = 0;

    for (const n of queries) {
        if (!memo.has(n)) {
            // nがまだ計算されていない場合、直接計算とメモ化
            let current = n;
            let steps = 0;
            const path = []; // 経路を記録して、到達した値がmemo化済みか確認する

            while (current !== 1) {
                if (memo.has(current)) {
                    // 既に計算済みの値に到達した場合、その分を足して終了
                    steps += memo.get(current)!;
                    // どの時点から計算がスキップされたかを正しく処理する必要があるが、
                    // この問題は「nから1に到達するまでの操作の総数」を問うため、
                    // nがスタート地点であることを考慮し、再帰的に計算するのが最も自然。

                    // 経路追跡を省き、nをスタートとして毎回計算する方針に戻る。
                    // 漸化式 (memoization) を利用するのが定石。
                    break; // ここでは、memoizationは「nから1までのステップ数」を格納する。
                }
                
                // 次のステップを計算する前に、現在のnに対する計算結果を求める
                // これは、現在のnに対するステップ数を求める問題であり、
                // 漸化式 n -> f(n) が「次の値」を定義する形ではないため、
                // nから1への最短経路を求めるため、再帰またはイテレーションで計算する。

                // 以下の実装は、クエリごとに独立して計算を行うため、Memoizationの恩恵を最大化する。
                
                // ここでは、nがクエリとして与えられたとき、nから1までのステップ数を計算する。
                let temp_n = n;
                let current_steps = 0;
                const visited = new Set<number>();
                const stack: number[] = [n];
                visited.add(n);
                
                // BFS/DFSで1に到達するまでのステップ数を計算する（ただし、これは元の問題の定義とは異なる。
                // 問題文の操作は単方向の遷移であり、この操作の「手数」を問うているため、通常のCollatz計算と同じ。）
                
                // 元の定義: n が偶数なら n/2、奇数なら 3n+1。これを繰り返す。
                // これは、スタート n から 1 に到達するまでの遷移回数を数える。

                let current_n = n;
                let count = 0;
                
                while (current_n !== 1) {
                    if (memo.has(current_n)) {
                        // メモ化された値があれば、その値を利用して計算を終了する。
                        // これは、nから1までのステップ数が既に計算されていることを意味する。
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
                
                // 最終的に、このnに対するステップ数をmemoに追加する。
                // 注意: 途中で到達した値がすでにmemo化されていれば、その値を加算する。
                // この実装では、nから始まったときの経路が全て未計算であれば、
                // 最終的に全ての経路が計算されることを期待する。
                
                // 確実に1に到達するまでの手数を計算し、結果をメモ化する。
                let final_steps = 0;
                let temp = n;
                
                // このクエリ n に対してのみ計算を行う
                while (temp !== 1) {
                    if (memo.has(temp)) {
                        // 既に計算済みの値に到達。その値から1までのステップ数を加算。
                        final_steps += memo.get(temp)!;
                        break;
                    }

                    // 自身が未計算の場合、操作を適用し、再帰的に（またはループで）計算を進める。
                    // 単純な繰り返し計算に帰着させる。
                    if (temp % 2 === 0) {
                        temp /= 2;
                    } else {
                        temp = 3 * temp + 1;
                    }
                    final_steps++;
                }
                
                // 1に到達したとき、その経路全体が完了したため、
                // nから1までの総ステップ数をmemoに記録する。
                memo.set(n, final_steps);
                total_steps += final_steps;

            } else {
                 // nが1の場合
                 memo.set(n, 0);
                 total_steps += 0;
            }
        }
    }

    // 最終結果の出力
    console.log(`total=${total_steps}`);
}

solve();
