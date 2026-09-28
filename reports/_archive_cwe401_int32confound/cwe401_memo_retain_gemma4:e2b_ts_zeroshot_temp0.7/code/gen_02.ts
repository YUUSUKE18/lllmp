/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から整数クエリを読み込み、コネルの数列（または3n+1問題）の計算を行い、
 * 1に到達するまでの手数を求める。計算結果をメモ化して高速化する。
 * 全てのクエリの手数の合計を求める。
 * 結果は `total=<合計>` の形式で出力する。
 * 
 * 入力: 標準入力から1行ずつ整数が与えられる。
 * 操作:
 * - n が偶数なら n/2
 * - n が奇数なら 3n+1
 * - n が 1 のときの手数は 0。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0 || input[0] === "") {
        console.log("total=0");
        return;
    }

    // 入力行を整数に変換し、空行や不正な行を無視する
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

    let totalMoves = 0;

    for (const n of queries) {
        if (memo.has(n)) {
            // すでに計算済みの場合はメモ化された値を加算
            totalMoves += memo.get(n);
            continue;
        }

        // 計算のための再帰/反復処理（メモ化付き）
        let current = n;
        const path: number[] = []; // 経路を記録するため（オプションだがデバッグやメモ化に役立つ）

        while (current !== 1) {
            if (memo.has(current)) {
                // 既に計算済みの値に到達したら、その手数を加算して終了
                const movesFromCurrent = memo.get(current);
                
                // n から current までの移動数を計算し、合計に加算する
                // ここでは、n から current までの移動数を別途計算する必要があるが、
                // 問題は「nが1に到達するまでの手数」を求めることなので、
                // 遷移を遡る（または順方向に進む）ことで、nから1までの距離を求める。
                
                // メモ化された値が「currentから1までの手数」を意味すると仮定して進める
                // この問題では、nから1までの経路を辿るのが自然なので、
                // ここでは一旦、nから1までの経路を探索する方針に戻す。
                
                // 別のメモ化戦略: nから1への手数を直接求める
                // 順方向の計算でメモ化するのが最も簡単。
                break; 
            }
            
            path.push(current);
            
            if (current === 1) {
                // 1に到達した場合は、pathの長さが手数
                const moves = path.length - 1; // 1 to N の遷移数
                memo.set(n, moves);
                totalMoves += moves;
                break;
            }

            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
        }
        
        // --- 修正されたメモ化戦略：nから1への手数を直接計算する ---
        // 上記のwhileループは、nから1への経路をたどる試みだったが、
        // メモ化の恩恵を最大限受けるには、先に1からnへの逆探索（または順探索）が望ましい。
        // 今回は、クエリごとに計算し、メモ化を適用する。
        
        // 再度、クエリ n ごとに計算し、メモ化を適用するロジックを修正する。
        // 既にループが終了しているため、もしnがまだメモ化されていなければ、
        // 実行した計算結果を保存する。
        
        if (!memo.has(n)) {
            let currentN = n;
            let steps = 0;
            
            // nから1への経路を辿る（この経路が手数となる）
            while (currentN !== 1) {
                if (memo.has(currentN)) {
                    // 既に計算済みの値に到達した。
                    // currentNから1までの手数を加算して終了。
                    steps += memo.get(currentN);
                    // nからcurrentNまでの手数は、現在の経路の長さから引く必要があるが、
                    // これは複雑になるため、単にnから1への経路を辿ることを優先する。
                    // 既にMemoized値が利用可能なら、その値で計算を打ち切る。
                    
                    // 簡略化のため、メモ化された値は「その値から1への手数」と解釈し、
                    // nからその値までの遷移数を加算する。
                    
                    // 経路を辿り直す必要があるため、ここでは単純に再帰的なメモ化（DP）を適用する。
                    // ただし、ここでは反復計算で到達するまでのステップ数を数える。
                    
                    // ここでは、Nから1への経路を辿る過程で、もし既にMemoized値があれば、
                    // その値を「nから1までの手数」として採用する。
                    // これは、nがmemoされていない場合にのみ実行される。
                    
                    // 経路を辿る処理を再実行する
                    break; 
                }

                if (currentN % 2 === 0) {
                    currentN /= 2;
                } else {
                    currentN = 3 * currentN + 1;
                }
                steps++;
            }
            
            // 経路を辿って手数を計算し、メモ化する（再帰的なメモ化が最も安全）
            // ここでは、上記で計算したstepsを信頼し、メモ化する。
            if (currentN === 1) {
                 memo.set(n, steps);
                 totalMoves += steps;
            } else {
                 // 経路探索が不完全な場合、再帰的な計算に切り替える
                 // 念のため、再帰的なメモ化で再計算を試みる。
                 
                 // 非常に大きな数になる可能性を考慮し、再帰的なメモ化を採用する。
                 // ただし、今回は反復で十分高速化されることを期待する。
                 
                 // 最終的な実装として、memoizationを適用した反復計算のみを採用する。
                 // (nが非常に大きい場合、この問題は計算量が爆発する可能性があるため、
                 // 実際にはテストケースが限定的であると仮定する。)
                 
                 // 以下のコードブロックで、最初に入力されたnに対して、
                 // nから1への経路を辿り、その手数を記録する。
                 
                 // 既にループで計算した結果を信頼する（再帰的なメモ化を省略して、
                 // 順方向の計算のみでメモ化を行う）。
                 // 念のため、もしループが終了しなかった場合は、エラーとして扱うか、
                 // 既にtotalMovesに加算したものを採用する。
            }
        }
    }

    // --- 最終的な、クエリごとに独立して計算し、合計する方式に修正 ---
    // 繰り返し計算を避けるため、クエリごとに独立して計算し、メモ化を適用する。
    
    const finalMemo = new Map<number, number>();
    finalMemo.set(1, 0);
    totalMoves = 0;

    for (const n of queries) {
        if (finalMemo.has(n)) {
            totalMoves += finalMemo.get(n);
            continue;
        }

        let current = n;
        const history: number[] = []; // 経路を記録
        
        // nから1への経路を辿る
        while (current !== 1) {
            history.push(current);
            
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
        }
        
        // 手数は履歴の長さ (n -> ... -> 1)
        const moves = history.length;
        
        // 逆順にメモ化する
        for (let i = history.length - 1; i >= 0; i--) {
            const node = history[i];
            // nodeから1への手数は、nodeの直後の値(history[i+1]または1)から1への手数 + 1
            // 実際には、historyの長さがnから1への遷移数になる。
            finalMemo.set(node, history.length - i);
        }
        
        // nから1への手数は history.length
        finalMemo.set(n, history.length);
        totalMoves += history.length;
    }
    
    // 最終結果の出力
    console.log(`total=${totalMoves}`);
}

solve();
