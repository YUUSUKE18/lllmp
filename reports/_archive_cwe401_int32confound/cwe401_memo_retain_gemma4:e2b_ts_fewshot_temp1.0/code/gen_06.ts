const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    crlfDelay: Infinity
});

const memo = new Map<number, number>();
let total_steps = 0;
let line_count = 0;

rl.on('line', (line) => {
    if (line.trim() === "") return;

    const n = parseInt(line.trim(), 10);

    if (isNaN(n)) return;

    if (n === 1) {
        // 1に到達するまでの手数は0
        const steps = 0;
        memo.set(n, steps);
        total_steps += steps;
    } else if (!memo.has(n)) {
        let current = n;
        const path: number[] = [];
        
        while (current !== 1) {
            if (current <= 0) break; // エラーケースや無限ループ対策
            
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            path.push(current);
        }
        
        // 1に到達するまでの手数は path.length
        const steps = path.length;
        
        // メモ化
        for (let i = 0; i < path.length; i++) {
            memo.set(path[i], i);
        }
        memo.set(n, steps);
        total_steps += steps;
    } else {
        // すでに計算済みの場合は、メモ化された値を合計に加算する
        total_steps += memo.get(n)!;
    }
    
    line_count++;
});

rl.on('close', () => {
    // 最終的な合計を1行で出力
    console.log(`total=${total_steps}`);
});
