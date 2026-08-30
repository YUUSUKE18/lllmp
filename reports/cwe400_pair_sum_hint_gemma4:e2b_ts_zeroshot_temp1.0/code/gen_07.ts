/**
 * 標準入力から目標値と整数を受け取り、その目標値になる2つの組の数を数えるプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length < 2) {
        console.log('pairs=0');
        return;
    }

    // 1行目が目標値
    const target = parseInt(input[0].trim(), 10);
    if (isNaN(target)) {
        // 目標値が不正な場合は処理を終了（問題の制約上、これは想定されないが安全策）
        console.log('pairs=0');
        return;
    }

    // 2行目以降の整数を読み込む
    const numbers: number[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            const num = parseInt(line, 10);
            // 整数として解釈できる行のみを格納
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    let count = 0;
    const n = numbers.length;

    // 2個の組 (i, j) が存在するように、2つの要素を選びます。
    // i != j である必要があります。
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            // numbers[i] と numbers[j] の和が目標値になるか確認
            if (numbers[i] + numbers[j] === target) {
                count++;
            }
        }
    }

    // 結果を出力
    console.log(`pairs=${count}`);
}

solve();
