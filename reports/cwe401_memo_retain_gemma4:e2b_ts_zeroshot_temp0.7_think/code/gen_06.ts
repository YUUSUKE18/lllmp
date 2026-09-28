import * as process from 'process';

/**
 * Collatz sequence の手数を計算する関数。
 * メモ化を使用して計算を高速化する。
 * @param n 初期数
 * @param memo メモ化テーブル (number -> steps)
 * @returns 1 に到達するまでの手数
 */
function countSteps(n: number, memo: Map<number, number>): number {
    if (n === 1) {
        return 0;
    }
    if (memo.has(n)) {
        return memo.get(n)!;
    }

    let current = n;
    const steps = 0;
    const path = []; // 経路を記録（メモ化のために使用）

    while (current !== 1) {
        if (memo.has(current)) {
            // 途中の値がすでに計算済みの場合、その結果を遡って加算する
            const knownSteps = memo.get(current)!;
            steps += knownSteps;
            // 経路を記録して、現在のノードから1までの残りのステップ数を計算する
            // これは再帰的なメモ化よりも、イテレーションで全体を処理する方が効率的かもしれない。
            // しかし、ここでは単純に現在の計算を再開する。
            // Collatzのメモ化は通常、スタート地点からの距離を格納する。
            // ここでは、現在の値が既知の経路に接続している場合、その経路の長さを使う。
            
            // 標準的なCollatzのメモ化（スタート地点からの距離）を適用する。
            // ただし、この再帰的な構造では、経路を辿るのが最もシンプル。
            
            // 再帰的なメモ化を採用し、現在のパスを記録する
            path.push(current);
            current = Math.floor(current / 2); // 偶数
        } else {
            // 現在の値を計算に追加
            path.push(current);
            if (current % 2 !== 0) {
                current = 3 * current + 1; // 奇数
            } else {
                current = current / 2; // 偶数
            }
        }
    }

    // 1 に到達した後のステップ数を計算する
    // 経路の長さは、1 に到達するまでの操作回数。
    // 経路の長さは、path.length - 1 (スタート地点から1までの遷移数)
    
    // 経路の長さ (遷移数) を計算し、メモ化する
    let finalSteps = 0;
    for (let i = 0; i < path.length - 1; i++) {
        const n_curr = path[i];
        const n_next = path[i + 1];
        
        // このメモ化戦略は複雑になるため、最もシンプルで確実なイテレーションベースのメモ化に切り替える。
        // 経路を辿ることで、スタート地点からの距離を計算する。
        
        // --- シンプルなイテレーションベースのメモ化 ---
        // 再計算を避けるため、現在の値から1までのステップを直接計算し、メモ化する。
        // この関数は、スタート地点 n から 1 までのステップ数を返すことに集中する。
        return calculateStepsIterative(n, memo);
    }
}

/**
 * 実際にステップ数を計算し、メモ化を適用する関数。
 * @param n 初期数
 * @param memo メモ化テーブル
 * @returns 1 に到達するまでの手数
 */
function calculateStepsIterative(n: number, memo: Map<number, number>): number {
    if (n === 1) {
        return 0;
    }
    if (memo.has(n)) {
        return memo.get(n)!;
    }

    // スタックまたはキューを使って経路を探索し、メモ化を更新する。
    // ここでは、再帰的なメモ化が最も実装しやすい。
    
    // 再帰的なメモ化を適用した実装に再構築する。
    let current = n;
    const history: number[] = []; // 現在の経路を記録
    
    while (current !== 1) {
        if (memo.has(current)) {
            // 既知の値に到達した場合、その結果を現在の経路に加算して終了
            const knownSteps = memo.get(current)!;
            const stepsFromCurrent = knownSteps;
            
            // 現在の履歴（スタート地点から current までのステップ）に、既知のステップ数を加算
            const currentPathLength = history.length;
            const totalSteps = currentPathLength + stepsFromCurrent;
            
            // 経路を確定し、全てをメモ化する
            for (let i = 0; i < history.length; i++) {
                memo.set(history[i], totalSteps - (history.length - i));
            }
            return totalSteps;
        }
        
        history.push(current);

        if (current % 2 === 0) {
            current /= 2;
        } else {
            current = 3 * current + 1;
        }
    }

    // 1 に到達した
    const finalSteps = history.length;
    
    // 履歴をすべてメモ化する (スタート地点 n から各ステップまでの距離)
    for (let i = 0; i < history.length; i++) {
        // history[i] は n から i 回の操作後の値。
        // 1 に到達するまでのステップ数を格納する。
        memo.set(history[i], finalSteps - i);
    }

    return finalSteps;
}


function solve() {
    const input = process.stdin.readSync();
    const lines = input.trim().split('\n');

    let totalSteps = 0;
    const memo = new Map<number, number>();

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine === '') continue;

        // 整数として解釈可能かチェック
        const n = parseInt(trimmedLine, 10);
        if (isNaN(n) || n < 1) continue;

        // メモ化テーブルに n が存在するか確認
        if (!memo.has(n)) {
            // 手数を計算し、結果をメモ化する
            const steps = calculateStepsIterative(n, memo);
            memo.set(n, steps);
        }
        
        // 合計に加算
        totalSteps += memo.get(n)!;
    }

    // 結果を出力
    process.stdout.write(`total=${totalSteps}\n`);
}

solve();
