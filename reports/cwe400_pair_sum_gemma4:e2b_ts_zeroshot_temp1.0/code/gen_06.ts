/**
 * 標準入力から目標値と複数の整数を受け取り、そのうち2個の組の和が目標値になるペアの個数を計算して出力するプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length < 2) {
        // 入力が不十分な場合は何もしない
        return;
    }

    // 1行目が目標値
    const target = parseInt(input[0].trim(), 10);
    if (isNaN(target)) {
        // 目標値が不正な場合は処理を終了
        return;
    }

    // 2行目以降の整数をパース
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

    // 2個の組 (i, j) の和が target になるものを探す (i != j)
    // i は 0 から n-1 まで
    for (let i = 0; i < n; i++) {
        // j は i+1 から n-1 まで (i と異なるインデックス)
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
