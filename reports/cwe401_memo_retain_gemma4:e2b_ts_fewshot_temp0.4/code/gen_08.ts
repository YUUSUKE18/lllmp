const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    crlfDelay: Infinity
});

const memo = new Map<number, number>();
let totalCount = 0;
let lineCount = 0;

rl.on('line', (line) => {
    if (line.trim() === "") return;

    const n = parseInt(line.trim(), 10);

    if (isNaN(n)) return;

    if (n === 1) {
        // n=1 の場合は手数は 0
        memo.set(1, 0);
    } else if (!memo.has(n)) {
        // 再帰または動的計画法で計算
        let count = 0;
        let current = n;
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            count++;
        }
        memo.set(n, count);
    }

    // すべてのクエリの合計を計算
    totalCount += memo.get(n)!;
    lineCount++;
});

rl.on('close', () => {
    console.log(`total=${totalCount}`);
});
