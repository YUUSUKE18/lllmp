const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    if (lines.length === 0) {
        console.log("total=0");
        return;
    }

    // 最初の行がクエリの数または最初の値であると仮定し、
    // 仕様に基づき、入力全体を整数として扱う。
    // 入力が「1 以上の整数が 1 行に 1 個ずつ並びます（クエリ）」であるため、
    // 各行が次のクエリとなる。

    // 読み込んだ行を整数配列に変換
    const queries = [];
    for (const line of lines) {
        const num = parseInt(line, 10);
        if (!isNaN(num)) {
            queries.push(num);
        }
    }

    if (queries.length === 0) {
        console.log("total=0");
        return;
    }

    // メモ化テーブル
    const memo = new Map<number, number>();

    /**
     * 操作を繰り返し適用し、1に到達するまでの手数を計算する関数
     * @param n 初期値
     * @returns 1に到達するまでの手数
     */
    function calculateSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 0;
        let current = n;
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        memo.set(n, steps);
        return steps;
    }

    let totalSteps = 0;

    // すべてのクエリに対して計算と合計を行う
    for (const n of queries) {
        // 仕様に基づき、nがクエリとして与えられていると解釈する
        // (例: nが1行に1個ずつ並んでいる)
        const steps = calculateSteps(n);
        totalSteps += steps;
    }

    // 最終結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
