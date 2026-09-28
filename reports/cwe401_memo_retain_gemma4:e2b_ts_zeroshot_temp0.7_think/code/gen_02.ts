import * as fs from 'fs';

function solve() {
    // 標準入力からデータを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    
    if (input === "") {
        console.log("total=0");
        return;
    }

    // 入力をスペースで分割し、整数としてフィルタリングする
    const queries = input.split(/\s+/).map(s => parseInt(s, 10)).filter(n => !isNaN(n) && n >= 1);

    if (queries.length === 0) {
        console.log("total=0");
        return;
    }

    // メモ化のためのマップ。キー: 数値, 値: 1に到達するまでの手数
    const memo = new Map<number, number>();
    memo.set(1, 0); // ベースケース: 1の手数は0

    let totalSteps = 0;

    /**
     * 指定された数 n から 1 に到達するまでの手数を計算する関数
     * メモ化を利用する
     * @param n 開始値
     * @returns 手数
     */
    function calculateSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps: number;
        
        // n が偶数なら n/2
        if (n % 2 === 0) {
            steps = 1 + calculateSteps(n / 2);
        } 
        // n が奇数なら 3n+1
        else {
            // 3n + 1 は 64bit 整数に収まるため、通常のnumber型で計算する
            steps = 1 + calculateSteps(3 * n + 1);
        }

        // 結果をメモ化する
        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリに対して手数を計算し、合計を求める
    for (const n of queries) {
        // 各クエリについて計算を実行
        totalSteps += calculateSteps(n);
    }

    // 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
