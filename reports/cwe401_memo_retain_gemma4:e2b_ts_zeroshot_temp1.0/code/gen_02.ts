/**
 * 仕様:
 * 標準入力から与えられたクエリ n に対して、nが偶数なら n/2、奇数なら 3n+1 を繰り返して 1 に到達するまでの手数を求める。
 * 1 のときの手数は 0。
 * すべてのクエリの手数の合計を求める。
 * 同じ整数が繰り返し現れるため、計算結果をメモ化して高速化する。
 * 標準出力に `total=<合計>` を出力する。
 * Node.js の TypeScript で実装する。
 */

function solve() {
    const fs = require('fs');

    const input = fs.readFileSync(0, 'utf8').trim().split('\n');
    
    if (input.length === 0 || input[0] === "") {
        console.log("total=0");
        return;
    }

    let total_count = 0;
    const memo = new Map<number, number>();

    for (const line of input) {
        // 空行や数値として解釈できない行を無視
        const n_str = line.trim();
        if (n_str === "") continue;

        let n: number;
        try {
            n = parseInt(n_str, 10);
            if (isNaN(n) || n < 1) continue;
        } catch (e) {
            continue;
        }

        // メモ化のチェック
        if (memo.has(n)) {
            total_count += memo.get(n);
            continue;
        }

        // 再帰/反復計算（メモ化を適用）
        let steps = 0;
        let current = n;
        const path: number[] = []; // 経路を記録して、ループを検出するために使用

        while (current !== 1) {
            if (memo.has(current)) {
                // 既に計算済みの値に到達した場合、メモ化された値と現在のステップ数を合計する
                steps += memo.get(current);
                break;
            }
            
            // ループ検出のための経路記録
            path.push(current);

            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        if (current === 1) {
            // 1 に到達したときのステップ数
            // 経路を遡って、まだメモ化されていない中間値があれば、それらをメモ化する
            for (let i = path.length - 1; i >= 0; i--) {
                const val = path[i];
                if (!memo.has(val)) {
                    // この再計算のパス上の値に対して、1 への最短経路を計算する（再帰的に）
                    // 今回の要件は「n から 1 までの手数を求める」なので、
                    // 最初に到達した経路からメモ化していくのが最も効率的。
                    
                    // ただし、この問題は「n から 1 への手数を求める」のではなく、「n が 1 に到達するまでの手数」を問うているため、
                    // 通常は貪欲に計算し、途中でメモ化を更新する。
                    
                    // 再度、シンプルに n から 1 への手数を再計算し、到達した値すべてをメモ化する。
                    
                    // 既存のロジックを修正し、到達した値に対してすぐにメモ化するように変更する。
                    // ここでは、最初に計算した経路の結果を保持する。
                    // 経路を遡りながら、もし途中値が未計算なら計算し、メモ化する。
                    
                    // 最もシンプルなメモ化戦略を採用する：ループ内で計算結果を直接メモ化する。
                    // 1 に到達したときのステップ数を保存する。
                    
                    // この実装では、ループ内で計算されたステップ数を `memo` に格納する。
                    // ただし、ループ内の `steps` は単なる経路上のステップ数であり、
                    // 実際の「手数」は、メモ化された値を利用して累積的に計算する必要があるため、
                    // 単純な反復計算の累積として捉え直す必要がある。
                    
                    // ここでは、n から 1 への経路上の各ステップを記録し、n 自身の結果を求める。
                    // n から n/2 や 3n+1 を繰り返す過程を追跡する。
                }
            }
            
            // 最終的な手数は、ループでカウントした steps
            total_count += steps;
            
            // 経路上のすべての値（n, n/2, ...）をメモ化する
            let temp = n;
            let current_steps = 0;
            const history: number[] = [];

            while (temp !== 1) {
                history.push(temp);
                if (memo.has(temp)) break; // 既にメモがあれば停止
                
                if (temp % 2 === 0) {
                    temp = temp / 2;
                } else {
                    temp = 3 * temp + 1;
                }
                current_steps++;
            }
            
            // 経路上の各値に対して、その値から 1 への手数を計算してメモ化する（再帰的メモ化）
            // しかし、問題は「n から 1 への手数」を求めることであり、このプロセスは
            // 1 のみを目標とするため、ループ内の計算がそのまま手数となる。
            
            // 最終的に、n から 1 への手数を求めるため、ループで計算された steps をそのまま加算する。
            // 経路上の値が既知であれば、その値の計算結果を再利用する。
            
            for (const val of history) {
                if (!memo.has(val)) {
                    // 再帰的に計算し、結果をメモ化する
                    const sub_steps = calculate_steps_recursive(val, memo);
                    memo.set(val, sub_steps);
                }
            }
            
            // n の計算結果を最終的に加算
            total_count += memo.get(n)!;


        } else {
            // 1 に到達しなかった（通常は起こらないが、念のため）
            // このケースは、アルゴリズムが正しく機能していれば到達しない。
            // 実際には、問題の構造上、n から 1 への経路は必ず存在する（Collatz conjecture）。
        }
    }

    // 最終的な合計を出力
    console.log(`total=${total_count}`);
}

/**
 * 再帰的に n から 1 への手数を計算し、メモに保存する関数。
 * @param n 現在の数
 * @param memo メモ化マップ
 * @returns n から 1 への手数
 */
function calculate_steps_recursive(n: number, memo: Map<number, number>): number {
    if (n === 1) {
        return 0;
    }
    if (memo.has(n)) {
        return memo.get(n)!;
    }

    let next_n: number;
    if (n % 2 === 0) {
        next_n = n / 2;
    } else {
        next_n = 3 * n + 1;
    }

    // 次のステップを再帰的に計算
    const steps = 1 + calculate_steps_recursive(next_n, memo);

    // 結果をメモ化
    memo.set(n, steps);
    return steps;
}

// メイン処理の実行
solve();
