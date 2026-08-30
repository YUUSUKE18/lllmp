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

    // 1行目が目標値
    const target = parseInt(input[0].trim(), 10);
    if (isNaN(target)) {
        console.log('pairs=0');
        return;
    }

    // 2行目以降から整数を読み込む
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

    // 2個の組 (i, j) で numbers[i] + numbers[j] = target となるものを探す
    // i と j は異なるインデックスでなければならない (位置が異なる2個)
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            // 64bit整数として扱われるため、JavaScriptの標準のNumber型（IEEE 754倍精度浮動小数点数）で十分な範囲をカバーするが、
            // 入力値が非常に大きい場合を考慮し、計算結果が安全であることを確認する。
            // 問題の制約上、入力値と目標値が64bitに収まるため、和もその範囲内に収まる。
            if (numbers[i] + numbers[j] === target) {
                pairCount++;
            }
        }
    }

    // 結果を出力
    console.log(`pairs=${pairCount}`);
}

solve();
