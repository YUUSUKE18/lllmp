import * as fs from 'fs';

/**
 * Collatz sequenceのステップ数を計算する関数。
 * メモ化を使用して計算を高速化する。
 * @param n 開始数
 * @param memo 計算結果を格納するマップ
 * @returns nが1になるまでの手数
 */
function countSteps(n: number, memo: Map<number, number>): number {
    if (n === 1) {
        return 0;
    }
    if (memo.has(n)) {
        return memo.get(n)!;
    }

    let nextN: number;
    if (n % 2 === 0) {
        nextN = n / 2;
    } else {
        // 3n + 1
        nextN = 3 * n + 1;
    }

    // 再帰的に次のステップを計算し、現在のステップ数を加算する
    const steps = 1 + countSteps(nextN, memo);
    
    // 結果をメモ化
    memo.set(n, steps);
    return steps;
}

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    
    if (input === "") {
        console.log("total=0");
        return;
    }

    // 入力を行ごとに分割し、整数としてフィルタリングする
    const lines = input.split('\n');
    const queries: number[] = [];

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine) {
            const n = parseInt(trimmedLine, 10);
            // 1以上の整数のみをクエリとして採用
            if (!isNaN(n) && n >= 1) {
                queries.push(n);
            }
        }
    }

    // メモ化テーブルの初期化
    const memo = new Map<number, number>();
    let totalSteps = 0;

    // 各クエリに対して計算を実行
    for (const n of queries) {
        // countSteps関数は内部でmemoを使用し、再利用性を確保する
        const steps = countSteps(n, memo);
        totalSteps += steps;
    }

    // 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
