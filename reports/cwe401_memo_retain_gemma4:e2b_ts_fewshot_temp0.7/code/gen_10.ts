const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    crlfDelay: Infinity
});

const memo = new Map<number, number>();
let total_count = 0;

rl.on('line', (line) => {
    if (line.trim() === "") return;

    const n = parseInt(line.trim(), 10);
    if (isNaN(n)) return;

    // メモ化された値があればそれを採用
    if (memo.has(n)) {
        const count = memo.get(n)!;
        total_count += count;
        return;
    }

    // ベースケース
    if (n === 1) {
        memo.set(1, 0);
        total_count += 0;
        return;
    }

    // 再帰/動的計画法による計算
    let steps = 0;
    let current = n;
    const path: number[] = [];

    while (current !== 1) {
        path.push(current);
        if (current % 2 === 0) {
            current = current / 2;
        } else {
            current = 3 * current + 1;
        }
    }
    path.push(1); // 終点1を追加
    steps = path.length - 1;

    // パスを遡ってメモ化
    for (let i = path.length - 1; i >= 0; i--) {
        memo.set(path[i], steps - i);
    }
    
    // 最終的な結果を合計に追加（再帰的な構造を避けるため、ここでは直接計算結果を合計する）
    // ただし、memo化が正しく行われていれば、次のクエリで参照される。
    // ここでは、このクエリに対する結果（steps）を total_count に加算する。
    total_count += steps;
});

rl.on('close', () => {
    console.log(`total=${total_count}`);
});
