/**
 * 仕様を満たすプログラム
 * 題意：Collatz予想 (3n+1問題) の到達回数を計算し、それらを合計する。
 * メモ化を使用して高速化する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // メモ化テーブル
    const memo: Map<number, number> = new Map();
    let totalSteps = 0;

    for (const line of lines) {
        let n: number;
        // 整数として解釈を試みる
        if (!isNaN(parseInt(line, 10))) {
            n = parseInt(line, 10);

            if (n === 1) {
                // n=1 のときは手数は 0
                memo.set(1, 0);
            } else if (!memo.has(n)) {
                // 未知の数に対する計算
                let current = n;
                const path: number[] = [];
                let steps = 0;

                // 1 に到達するまでのパスを記録し、メモ化する
                while (current !== 1 && !memo.has(current)) {
                    path.push(current);
                    if (current % 2 === 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                }

                // 1 に到達したときのステップ数を計算し、パスを遡ってメモ化する
                const finalSteps = (memo.get(1) || 0) + path.length;
                
                // パスを逆順にしてメモ化
                for (let i = path.length - 1; i >= 0; i--) {
                    const val = path[i];
                    // 1から到達するまでのステップ数を計算
                    let stepsFromVal = 0;
                    let temp = val;
                    while (temp !== 1) {
                        if (temp % 2 === 0) {
                            temp /= 2;
                        } else {
                            temp = 3 * temp + 1;
                        }
                        stepsFromVal++;
                    }
                    
                    // 現在のnから1までの全ステップ数を計算 (これは再帰的に計算する方が効率的だが、ここではパスを辿る)
                    // シンプルに、パスを辿るだけで十分。
                    // 最終的なステップ数は、現在のノードから1に到達するまでのステップ数となる。
                    
                    // より簡単なメモ化戦略：現在のノードから1までのステップ数を直接計算する。
                    // 今回は、入力されたnから1までのステップ数を直接計算する。
                    
                    let steps_n = 0;
                    let current_n = n;
                    const trace: number[] = [];
                    
                    // nから1までのトレースを計算
                    while (current_n !== 1) {
                        trace.push(current_n);
                        if (current_n % 2 === 0) {
                            current_n /= 2;
                        } else {
                            current_n = 3 * current_n + 1;
                        }
                    }
                    // 1に到達するまでのステップ数は、traceの長さ
                    const final_n_steps = trace.length;

                    // トレースされたすべての値をメモ化する
                    for (const val_to_memo of trace) {
                        memo.set(val_to_memo, final_n_steps - (trace.indexOf(val_to_memo) === trace.length - 1 ? 0 : 1) + (trace.indexOf(val_to_memo) + 1));
                        // より正確なメモ化のため、再帰的に計算された値を使う。
                        // ただし、ここでは「nから1までの全ステップ数」を求めるため、
                        // nから1までの経路を辿るのが最も直接的。
                    }
                    
                    // シンプルなメモ化戦略に戻る: 現在のnから1までのステップ数を計算し、それを格納する。
                    let current_steps = 0;
                    let temp_n = n;
                    const step_history: number[] = [];

                    while (temp_n !== 1) {
                        step_history.push(temp_n);
                        if (temp_n % 2 === 0) {
                            temp_n /= 2;
                        } else {
                            temp_n = 3 * temp_n + 1;
                        }
                        current_steps++;
                    }

                    // 1に到達するまでのステップ数は current_steps
                    memo.set(n, current_steps);
                    
                    // 経路上のすべての数について、その数から1までのステップ数を計算してメモ化する
                    // これは非常に複雑になるため、単に n から 1 までのステップ数を計算し、n をメモ化する。
                    // (Memoizationにより、この計算は再帰的に行うことになるが、今回は入力されたnに対する直接の計算結果を求められている。)
                    
                    // 再帰的なメモ化を適用して、計算を高速化する。
                    // ここでは、nが計算された結果を再帰的に求める形でメモ化を適用する。
                    memo.set(n, current_steps);

                }
            }
        }
        
        // メモ化された結果があれば加算
        if (memo.has(n)) {
            totalSteps += memo.get(n)!;
        } else {
            // メモ化されていない場合は、毎回計算する (これは再帰/メモ化のループ外で発生するはずだが、念のため)
            let current = n;
            let steps = 0;
            while (current !== 1) {
                if (current % 2 === 0) {
                    current /= 2;
                } else {
                    current = 3 * current + 1;
                }
                steps++;
            }
            totalSteps += steps;
            memo.set(n, steps);
        }
    }

    // 最終結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
