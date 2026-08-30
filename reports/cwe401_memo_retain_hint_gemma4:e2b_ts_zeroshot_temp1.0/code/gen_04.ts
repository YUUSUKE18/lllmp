/**
 * 課題：Collatz数列のステップ数を計算し、その合計を求める問題。
 * メモ化（動的計画法/メモ化再帰）を用いて効率的に計算する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n');
    let totalSteps = 0;
    const memo = new Map<number, number>();

    // 入力をパースし、クエリを処理する
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine === "") {
            continue; // 空行は無視
        }

        let n: number;
        try {
            n = parseInt(trimmedLine, 10);
            if (isNaN(n) || n < 1) {
                continue; // 整数として解釈できない、または1未満は無視
            }
        } catch (e) {
            continue; // パースエラーは無視
        }

        // nがすでに計算済みか確認
        if (memo.has(n)) {
            const steps = memo.get(n)!;
            totalSteps += steps;
            continue;
        }

        // メモ化された値がない場合、計算を開始する
        if (n === 1) {
            memo.set(1, 0);
            totalSteps += 0;
            continue;
        }

        // nがまだ計算されていない場合の計算（再帰的/反復的、ここでは再帰＋メモ化）
        // n が大きい可能性があるため、再帰の深さに注意するが、メモ化により効率化されるはず。
        // 途中の値は64bitに収まることが保証されている。

        const calculateSteps = (num: number, currentMemo: Map<number, number>): number => {
            if (num === 1) {
                return 0;
            }
            if (currentMemo.has(num)) {
                return currentMemo.get(num)!;
            }

            let nextN: number;
            if (num % 2 === 0) {
                nextN = num / 2;
            } else {
                nextN = 3 * num + 1;
            }

            // 再帰呼び出し
            const steps = 1 + calculateSteps(nextN, currentMemo);
            
            // メモ化
            currentMemo.set(num, steps);
            return steps;
        };

        // メモ化処理を再実行して、計算結果と合計を更新する
        const stepsForN = calculateSteps(n, memo);
        
        // 既に合計に加算されているか（上記でチェック済みだが念のため）
        if (!memo.has(n) || memo.get(n)! !== stepsForN) {
            // これは、calculateSteps内で完全に計算が完了しているため、ここでは加算処理を再調整する
            // 効率化のため、calculateSteps内で合計を直接更新する構造に変更する。
            // ただし、課題の要求に従い、ここでは標準的なメモ化の構造を採用し、
            // 最初のループで全てのクエリを処理する形に戻す。
        }
    }

    // --- メモ化をより直接的に行うための再構築 ---
    // 最初に全ての入力された数について計算を実行し、合計を求める。
    // 既に上のループで合計が計算されているが、よりクリーンな構造にするため、
    // 処理ロジックを一度リセットし、全ての数に対して計算を行う。

    const finalMemo = new Map<number, number>();
    let finalTotal = 0;

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine === "") continue;

        let n: number;
        try {
            n = parseInt(trimmedLine, 10);
            if (isNaN(n) || n < 1) continue;
        } catch (e) {
            continue;
        }

        if (finalMemo.has(n)) {
            finalTotal += finalMemo.get(n)!;
            continue;
        }

        // 計算関数（再帰＋メモ化）
        const compute = (num: number): number => {
            if (num === 1) return 0;
            if (finalMemo.has(num)) return finalMemo.get(num)!;

            let nextN: number;
            if (num % 2 === 0) {
                nextN = num / 2;
            } else {
                nextN = 3 * num + 1;
            }

            const steps = 1 + compute(nextN);
            finalMemo.set(num, steps);
            return steps;
        };

        const steps = compute(n);
        finalMemo.set(n, steps);
        finalTotal += steps;
    }
    
    // 最終結果の出力
    console.log(`total=${finalTotal}`);
}

solve();
