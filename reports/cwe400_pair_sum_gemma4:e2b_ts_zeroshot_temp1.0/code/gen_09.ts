/**
 * 標準入力から目標値と整数のリストを読み込み、
 * 目標値になる2つの組の個数を数えるプログラム。
 */
function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length < 2) {
        console.log('pairs=0');
        return;
    }

    const target = parseInt(input[0].trim(), 10);
    const numbers: number[] = [];

    // 2行目以降の行を処理
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line === '') continue;
        const num = parseInt(line, 10);
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }

    let pairCount = 0;
    const n = numbers.length;

    // 2つの組 (i, j) のうち、i != j かつ numbers[i] + numbers[j] = target となるものの個数を数える
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (numbers[i] + numbers[j] === target) {
                pairCount++;
            }
        }
    }

    console.log(`pairs=${pairCount}`);
}

solve();
