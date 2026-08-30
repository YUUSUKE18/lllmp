/**
 * 標準入力から目標値と整数のリストを読み込み、
 * 目標値になる2つの整数の組の数を数えるプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length < 2) {
        console.log('pairs=0');
        return;
    }

    // 1行目: 目標値
    const target = parseInt(input[0].trim(), 10);

    // 2行目以降: 数値のリスト
    const numbers: number[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            const num = parseInt(line, 10);
            // 整数として解釈できる行のみをリストに追加
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    let pairCount = 0;
    const n = numbers.length;

    // 2個の組 (i, j) で numbers[i] + numbers[j] = target となるものを数える
    // i != j の制約があるため、二重ループを使用する。
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (numbers[i] + numbers[j] === target) {
                pairCount++;
            }
        }
    }

    // 結果の出力
    console.log(`pairs=${pairCount}`);
}

solve();
