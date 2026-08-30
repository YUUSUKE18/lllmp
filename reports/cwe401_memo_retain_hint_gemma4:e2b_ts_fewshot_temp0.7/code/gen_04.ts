const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    crlfDelay: Infinity
});

const memo = new Map<number, number>();
let totalSum = 0;
let lineCount = 0;

rl.on('line', (line) => {
    if (line.trim() === "") return;

    const n = parseInt(line.trim(), 10);
    if (isNaN(n)) return;

    if (n === 1) {
        // 1 に到達するまでの手数は 0
        totalSum += 0;
        return;
    }

    // メモ化された値があればそれを使用
    if (memo.has(n)) {
        totalSum += memo.get(n);
        return;
    }

    // 計算（手数を求める）
    let count = 0;
    let currentN = n;

    while (currentN !== 1) {
        if (currentN % 2 === 0) {
            currentN /= 2;
        } else {
            currentN = 3 * currentN + 1;
        }
        count++;
    }

    // 結果をメモ化して合計に加算
    memo.set(n, count);
    totalSum += count;
});

rl.on('close', () => {
    // 最終結果を出力
    console.log(`total=${totalSum}`);
});
