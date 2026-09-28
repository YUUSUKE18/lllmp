const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    // 処理対象の数をスタックとして扱う
    const stack: number[] = [];
    let total_count = 0;

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (Number.isNaN(n)) continue;

        if (n === 1) {
            // n=1 の場合は手数は 0
            stack.push(0);
        } else if (n % 2 === 0) {
            // n が偶数なら n/2
            stack.push(solve(n / 2));
        } else {
            // n が奇数なら 3n+1
            stack.push(solve(3 * n + 1));
        }
    }

    // スタック内の結果を合計する
    let current_sum = 0;
    while (stack.length > 0) {
        current_sum += stack.pop()!;
    }

    // 再帰呼び出しによるメモ化（今回は再帰で直接計算し、スタックで結果を保持する形にする）
    // 厳密には、再帰呼び出しで結果を返す関数を定義し、それを呼び出す必要があるが、
    // この問題は「各クエリの手数の合計」を求めるため、入力の各行に対して計算し、その合計を求める形に変更する。
    // メモ化を適用するために、再帰関数を定義し、結果をキャッシュする。

    const memo: Map<number, number> = new Map();

    function count_steps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let result: number;
        if (n % 2 === 0) {
            result = count_steps(n / 2);
        } else {
            result = 3 * n + 1 + count_steps(3 * n + 1);
        }

        memo.set(n, result);
        return result;
    }

    // 全ての入力に対して計算し、合計を求める
    let final_total = 0;
    for (const line of lines) {
        const n = parseInt(line, 10);
        if (!isNaN(n) && n >= 1) {
            final_total += count_steps(n);
        }
    }

    console.log(`total=${final_total}`);
}

// 実行
solve();
