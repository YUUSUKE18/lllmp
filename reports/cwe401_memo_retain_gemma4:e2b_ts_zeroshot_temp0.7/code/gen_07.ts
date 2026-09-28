/**
 * 仕様を満たすプログラム
 * 
 * 仕様：
 * 標準入力から整数クエリを受け取り、コナーズの予想（3n+1 または n/2）の操作を繰り返して1に到達するまでの手数を求める。
 * 計算結果をメモ化して高速化する。
 * 全てのクエリの手数の合計を求め、`total=<合計>` の形式で出力する。
 * 
 * 言語・形式：
 * Node.jsで動作する完全なTypeScript。標準入力を読み込む。外部パッケージは使用しない。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    if (lines.length === 0) {
        console.log("total=0");
        return;
    }

    // メモ化テーブル
    const memo = new Map<number, number>();
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
            continue;
        }
        
        if (n === 1) {
            // nが1のときの手数は0
            // memo.set(1, 0); // 1に対する手数は0だが、再帰的に計算する際、これは終了条件として扱う
        } else if (memo.has(n)) {
            // メモがあればそれを使用
            const steps = memo.get(n)!;
            totalSteps += steps;
        } else {
            // メモがなければ計算
            let currentN = n;
            let steps = 0;
            const history = new Set<number>(); // サイクル検出用

            while (currentN !== 1) {
                if (currentN === 1) break; // 念のため

                // サイクル検出
                if (history.has(currentN)) {
                    // サイクルに陥った場合、現在の計算はループを抜けるが、
                    // この問題の文脈では1に到達するという前提なので、
                    // サイクル検出は厳密には不要かもしれないが、安全のため。
                    // 今回の仕様では1に到達するまでなので、サイクルは発生しないはず。
                    // 発生する可能性を考慮し、サイクル検出しても問題ない。
                    break; 
                }
                history.add(currentN);

                if (currentN % 2 === 0) {
                    currentN = currentN / 2;
                } else {
                    currentN = 3 * currentN + 1;
                }
                steps++;
            }

            // 1に到達したか、またはサイクルに陥ったか
            if (currentN === 1) {
                // 1に到達した場合、計算した手数をメモ
                memo.set(n, steps);
                totalSteps += steps;
            } else {
                // 1に到達しなかった（サイクルまたは無限ループの可能性、ただしこの問題では1に到達するはず）
                // サイクル検出が正しく機能しているか、または制約違反が発生している可能性があるが、
                // 問題の意図に従い、到達しない場合は無視するか、または計算した値を採用する。
                // ここでは、問題の構造上、必ず1に到達すると仮定し、到達した場合はメモする。
                // もし到達しなかった場合は、そのクエリは無効と見なされるか、
                // サイクルが検出された場合は、その経路での手数を採用する。
                // 今回は、到達したと仮定してメモする。
                // サイクル検出により、到達しなかった場合は、その経路の手数（steps）を採用する。
                // ただし、問題文は「1に到達するまでの手数を求め」なので、到達しない場合はエラーと見なすのが自然だが、
                // 競技プログラミングの文脈では、サイクル検出により計算を打ち切る。
                // ここでは、到達したかどうかに関わらず、計算した手順を記録する（サイクル検出が機能していればこれは正しい）。
                memo.set(n, steps);
                totalSteps += steps;
            }
        }
    }

    // 最終結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
