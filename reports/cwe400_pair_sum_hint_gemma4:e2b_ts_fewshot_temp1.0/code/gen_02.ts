const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    crlfDelay: Infinity
});

let lines: string[] = [];
let lineIndex = 0;

rl.on('line', (line) => {
    lines.push(line.trim());
});

rl.on('close', () => {
    if (lines.length === 0) {
        process.stdout.write('pairs=0\n');
        return;
    }

    const target = parseInt(lines[0], 10);
    const numbers: number[] = [];

    // 2行目以降を整数として読み込む
    for (let i = 1; i < lines.length; i++) {
        const num = parseInt(lines[i], 10);
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }

    const n = numbers.length;
    let pairCount = 0;

    // 2個の組の数を数える (O(N^2)だが、制約が不明なためここでは全探索を行う)
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (numbers[i] + numbers[j] === target) {
                pairCount++;
            }
        }
    }

    // 厳密に 1 行だけ出力
    process.stdout.write(`pairs=${pairCount}\n`);
});
