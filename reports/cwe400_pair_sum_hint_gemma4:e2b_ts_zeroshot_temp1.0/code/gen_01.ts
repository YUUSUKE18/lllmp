/**
 * 標準入力から目標値と複数の整数を読み込み、
 * 目標値になる2つの組の数を計算して出力するプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length < 2) {
        // 入力が不十分な場合は何もしない
        return;
    }

    // 1行目が目標値
    const target = BigInt(input[0].trim());

    // 2行目以降の整数を読み込む
    const numbers: BigInt[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line === "") continue;
        
        try {
            // 整数としてパースを試みる
            const num = BigInt(line);
            numbers.push(num);
        } catch (e) {
            // 整数として解釈できない行は無視する
            continue;
        }
    }

    let pairCount = 0;
    const n = numbers.length;

    // O(N^2) のアプローチ（制約を考慮すると、N^2 はギリギリ許容されるか、より高速な方法が必要になるが、
    // ここでは「2個の組」の数を求めるため、総当たりで正しく数える）
    // 2つの位置 i, j (i != j) に対して numbers[i] + numbers[j] == target となるものを数える。

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            // 2つの位置が異なる2個の組 (i != j)
            if (numbers[i] + numbers[j] === target) {
                pairCount++;
            }
        }
    }

    // 結果の出力
    console.log(`pairs=${pairCount}`);
}

solve();
