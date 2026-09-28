const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    crlfDelay: Infinity
});

const memo: Map<number, number> = new Map();
let total_steps = 0;
let lines_read = 0;

rl.on('line', (line) => {
    if (lines_read === 0) {
        // 最初の行はクエリとして処理する
        const line_content = line.trim();
        if (line_content.length > 0) {
            const n = parseInt(line_content, 10);
            if (!isNaN(n)) {
                let current_n = n;
                let steps = 0;

                // 1 に到達するまでの手数を計算
                while (current_n !== 1) {
                    if (current_n % 2 === 0) {
                        current_n = current_n / 2;
                    } else {
                        current_n = 3 * current_n + 1;
                    }
                    steps++;
                }
                
                // 結果をメモ化し、合計に加算
                memo.set(n, steps);
                total_steps += steps;
            }
        }
    }
    lines_read++;
});

rl.on('close', () => {
    // すべての処理が終わった後、合計を出す
    console.log(`total=${total_steps}`);
});
