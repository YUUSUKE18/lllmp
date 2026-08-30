/**
 * 標準入力から目標値と整数のリストを読み込み、
 * 目標値になる2つの整数の組の個数を数えるプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length < 2) {
        // 入力が不足している場合は何もしない（仕様上、最低2行は期待される）
        console.log("pairs=0");
        return;
    }

    // 1行目が目標値
    const target = parseInt(input[0].trim(), 10);
    if (isNaN(target)) {
        console.log("pairs=0");
        return;
    }

    // 2行目以降を整数として読み込む
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

    let pairCount = 0;
    const n = numbers.length;

    // 2個の組 (i, j) で numbers[i] + numbers[j] == target となるものを探す
    // i と j は異なるインデックスでなければならない (位置が異なる2個)
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
