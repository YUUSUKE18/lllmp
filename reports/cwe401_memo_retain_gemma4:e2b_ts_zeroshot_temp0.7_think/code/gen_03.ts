import * as readline from 'readline';

/**
 * Collatz数列のステップ数を計算する関数。
 * メモ化を使用して計算を高速化する。
 * @param n 初期値
 * @param memo 計算結果を格納するキャッシュ
 * @returns 1に到達するまでのステップ数
 */
function countCollatzSteps(n: number, memo: Map<number, number>): number {
    if (n === 1) {
        return 0;
    }
    
    if (memo.has(n)) {
        return memo.get(n)!;
    }

    let nextN: number;
    
    if (n % 2 === 0) {
        // n が偶数なら n/2
        nextN = n / 2;
    } else {
        // n が奇数なら 3n+1
        // 3n+1 は 64bit の範囲に収まることが想定される
        nextN = 3 * n + 1;
    }

    // 再帰的に次のステップの数を計算し、現在のステップ数を加算する
    const steps = 1 + countCollatzSteps(nextN, memo);
    
    // 結果をメモ化する
    memo.set(n, steps);
    
    return steps;
}

function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    const queries: number[] = [];
    let lineCount = 0;

    rl.on('line', (line) => {
        // 空行や整数として解釈できない行を無視する
        const trimmedLine = line.trim();
        if (trimmedLine.length > 0) {
            const n = parseInt(trimmedLine, 10);
            if (!isNaN(n) && n >= 1) {
                queries.push(n);
            }
        }
        lineCount++;
    });

    rl.on('close', () => {
        // 全てのクエリに対して計算を行う
        let totalSteps = 0;
        // 同じ数の計算結果を共有するためのメモを初期化
        const memo = new Map<number, number>();

        for (const n of queries) {
            // 各クエリに対して計算を行う
            // countCollatzSteps内部でメモが共有されるように、ここでは直接呼び出す
            totalSteps += countCollatzSteps(n, memo);
        }

        // 結果を出力
        console.log(`total=${totalSteps}`);
    });
}

solve();
