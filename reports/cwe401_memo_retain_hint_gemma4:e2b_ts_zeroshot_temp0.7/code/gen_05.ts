/**
 * 仕様に基づき、コネルの予想（3n+1問題）のステップ数を計算し、その合計を求めるプログラム。
 * メモ化を用いて高速化する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("total=0");
        return;
    }

    // 入力を整数に分割し、フィルタリングする
    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const queries = lines.map(Number);

    // メモ化テーブル
    const memo: Map<number, number> = new Map();
    memo.set(1, 0);

    let totalSteps = 0;

    /**
     * 任意の数 n から 1 に到達するまでのステップ数を計算する関数（メモ化付き）
     * @param n 現在の数
     * @returns 1 に到達するまでのステップ数
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
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps.push(current);
        }

        // 1 に到達するまでのステップ数は、操作の回数（最後のステップを除く）
        // ただし、問題の要求は「1 に到達するまでの手数」なので、
        // n -> f(n) -> f(f(n)) -> ... -> 1 となる操作の回数を数える。
        // ここでは、n から 1 に到達するまでの操作回数を数える。
        // 最初の操作は n から始まる。
        let count = 0;
        let temp = n;
        while (temp !== 1) {
            if (temp % 2 === 0) {
                temp = temp / 2;
            } else {
                temp = 3 * temp + 1;
            }
            count++;
        }

        // メモ化の更新
        memo.set(n, count);
        return count;
    }

    for (const n of queries) {
        if (n >= 1) {
            const steps = countSteps(n);
            totalSteps += steps;
        }
    }

    // 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
