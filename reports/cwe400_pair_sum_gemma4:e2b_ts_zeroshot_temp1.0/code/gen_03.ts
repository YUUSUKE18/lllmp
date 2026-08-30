/**
 * 標準入力から目標値と整数のリストを読み込み、
 * 目標値になる2つの組の数を計算して出力する。
 */
function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length < 2) {
        console.log('pairs=0');
        return;
    }

    // 1行目は目標値
    const target = parseInt(input[0].trim(), 10);
    if (isNaN(target)) {
        console.log('pairs=0');
        return;
    }

    // 2行目以降を整数リストとして読み込む
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

    // 2個の組の数を数える
    let pairCount = 0;
    const n = numbers.length;

    // 2つのインデックス i と j (i < j) に対して、numbers[i] + numbers[j] === target となるものを探す
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (numbers[i] + numbers[j] === target) {
                pairCount++;
            }
        }
    }

    // 結果を出力
    console.log(`pairs=${pairCount}`);
}

solve();
