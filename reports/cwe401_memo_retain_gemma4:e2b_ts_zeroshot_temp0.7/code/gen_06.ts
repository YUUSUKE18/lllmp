/**
 * 仕様に基づき、Collatz予想の操作を繰り返す手数を計算し、その合計を求めるプログラム。
 * メモ化を使用して計算を高速化する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    // メモ化テーブル
    const memo: Map<number, number> = new Map();
    let totalSteps = 0;

    // 入力行を処理
    for (const line of input) {
        const trimmedLine = line.trim();
        if (trimmedLine === '') continue;

        let n: number;
        try {
            n = parseInt(trimmedLine, 10);
            if (isNaN(n) || n < 1) continue;
        } catch (e) {
            // 数値として解釈できない行は無視
            continue;
        }

        if (n === 1) {
            // n が 1 のときの手数は 0
            if (!memo.has(1)) {
                memo.set(1, 0);
            }
            // n=1のクエリは1回で終了
            totalSteps += memo.get(1)!;
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            totalSteps += memo.get(n)!;
            continue;
        }

        // 再帰的または反復的に計算（メモ化を更新しながら）
        let currentN = n;
        const path: number[] = []; // 経路を記録してメモ化を更新するため

        while (currentN !== 1) {
            // 既に計算済みの値があれば、その結果を現在の計算に加算する
            if (memo.has(currentN)) {
                const stepsFromCurrent = memo.get(currentN)!;
                // 現在のNから1に到達する手数は、memoに保存されている値 + 現在のステップ数
                const totalStepsForN = stepsFromCurrent + path.length;
                
                // 経路上のすべての値の合計を更新（これは厳密にはクエリごとの合計ではなく、memo化の過程で全クエリの合計を求めるための構造が必要だが、
                // 仕様は「各クエリ n について、n が 1 に到達するまでの手数を求め、その合計を求める」なので、
                // 各クエリの計算結果をtotalStepsに加算する形で進める）
                
                // ここでは、nが1に到達するまでの手数を計算し、その結果をtotalStepsに加算する流れを維持する。
                // 現在のcurrentNから1に到達する手数を計算し、その結果をmemoに保存する。
                
                // 経路上の各ステップの合計を計算するのではなく、nから1までの全ステップ数を求める。
                // ここでは、nから1までのステップ数を計算し、その結果をmemoに保存する。
                
                // 既にmemoに保存されていれば、その値がnから1までのステップ数。
                // nを計算したときのステップ数をそのまま加算する。
                totalSteps += stepsFromCurrent + path.length;
                memo.set(n, stepsFromCurrent + path.length);
                break; // 処理を終了
            }

            // 新しいステップを記録
            path.push(currentN);

            // Collatz操作の適用
            if (currentN % 2 === 0) {
                currentN /= 2;
            } else {
                currentN = 3 * currentN + 1;
            }
        }

        // ループが終了した場合（currentNが1になった場合、またはmemoに到達した場合）
        if (currentN === 1) {
            // 1に到達した場合、pathの長さが手数
            const steps = path.length;
            memo.set(n, steps);
            totalSteps += steps;
        }
        // もしループ中にmemoに到達した場合（上記if文で処理済み）
    }

    // 最終結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
