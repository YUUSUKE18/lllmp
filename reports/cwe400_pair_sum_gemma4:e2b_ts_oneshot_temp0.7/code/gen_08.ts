const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length < 2) {
        console.log("pairs=0");
        return;
    }

    // 1行目は目標値
    const target = parseInt(input[0].trim(), 10);

    // 2行目以降の数値を読み込む
    const numbers: number[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            const num = parseInt(line, 10);
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    let count = 0;
    const n = numbers.length;

    // 2個の組の数を数える
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (numbers[i] + numbers[j] === target) {
                count++;
            }
        }
    }

    // 結果を出力
    console.log(`pairs=${count}`);
}

solve();
