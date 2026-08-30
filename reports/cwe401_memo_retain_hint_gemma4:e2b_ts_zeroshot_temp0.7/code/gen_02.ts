/**
 * 仕様に基づき、コネルの予想（3n+1問題）の解法とそのメモ化を実装する。
 * 標準入力からクエリを読み込み、各クエリについて1に到達するまでの手数を計算し、その合計を求める。
 */

function solve() {
    const fs = require('fs');

    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    
    if (input === "") {
        console.log("total=0");
        return;
    }

    // 入力を改行で分割し、整数としてパースする
    const lines = input.split('\n');
    
    // 処理対象のクエリを格納する配列
    const queries: number[] = [];

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine === "") continue;
        
        const num = parseInt(trimmedLine, 10);
        
        // 整数として解釈できない行は無視する (仕様に基づき、整数として解釈できない行は無視する)
        if (isNaN(num) || num < 1) continue;
        
        queries.push(num);
    }

    // メモ化テーブル (Memoization)
    // キー: 状態 (n), 値: 1に到達するまでの手数
    const memo: Map<number, number> = new Map();
    memo.set(1, 0); // ベースケース: 1の手数は0

    /**
     * 1に到達するまでの手数を再帰的・メモ化的に計算する関数
     * @param n 現在の数
     * @returns 1に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current = n;
        const steps: number[] = [];

        while (current !== 1) {
            const next: number;
            if (current % 2 === 0) {
                // n が偶数なら n/2
                next = current / 2;
            } else {
                // n が奇数なら 3n+1
                next = 3 * current + 1;
            }
            steps.push(current);
            current = next;
        }
        
        // 1に到達するまでの総ステップ数を計算
        const totalSteps = steps.length;

        // メモ化テーブルに結果を保存
        // ただし、ここでは元のクエリ n から 1 への過程のステップ数を求めているため、
        // nがスタート地点の場合、nから1への経路の長さが「手数」となる。
        // 問題文の解釈: 「n が 1 に到達するまでの手数を求めます」
        // n=7 の場合: 7 -> 22 -> 11 -> 34 -> 17 -> 52 -> 26 -> 13 -> 40 -> 20 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (16ステップ)
        // 実際は、問題文の操作を「nから始めて1に到達するまでの操作回数」と解釈する。
        // n=7 の操作: 7(3*7+1=22) -> 22/2=11 -> 11(3*11+1=34) -> 34/2=17 -> 17(3*17+1=52) -> 52/2=26 -> 26/2=13 -> 13(3*13+1=40) -> 40/2=20 -> 20/2=10 -> 10/2=5 -> 5(3*5+1=16) -> 16/2=8 -> 8/2=4 -> 4/2=2 -> 2/2=1 (14ステップ)
        // 実際は、操作を繰り返す過程で1に到達するまでの操作回数を数える。
        
        // 再度、クエリ n から 1 への経路を計算し、そのステップ数を返す
        
        // 経路を記録し直す
        let currentN = n;
        let count = 0;
        const path: number[] = [n];

        while (currentN !== 1) {
            if (currentN % 2 === 0) {
                currentN /= 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            count++;
            path.push(currentN);
        }
        
        // 1に到達するまでの操作回数 (操作回数はステップ数 - 1)
        // 例: n=1 の場合、操作回数は 0 (これは既にベースケースで処理済み)
        // n=2 の場合: 2 -> 1 (1回)
        // n=3 の場合: 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7回)
        
        // 1に到達するまでの操作回数は、経路の長さから1を引いたもの (スタート地点を除く)
        const stepsToOne = path.length - 1;

        memo.set(n, stepsToOne);
        return stepsToOne;
    }

    // 全てのクエリに対して計算と合計を実行
    let totalSum = 0;
    for (const n of queries) {
        // 既にメモ化されているか確認
        if (!memo.has(n)) {
            const result = countSteps(n);
            totalSum += result;
        } else {
            totalSum += memo.get(n)!;
        }
    }

    // 結果を出力
    console.log(`total=${totalSum}`);
}

solve();
