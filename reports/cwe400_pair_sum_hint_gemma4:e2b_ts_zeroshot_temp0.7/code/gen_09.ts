/**
 * 標準入力から目標値と整数列を読み込み、
 * 目標値になる2つの組の個数を数えるプログラム。
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

    // 2行目以降の整数を読み込み、フィルタリングする
    const numbers: number[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            const num = parseInt(line, 10);
            // 整数として解釈でき、かつ64bit整数に収まるかを確認 (Node.jsのnumberは64bit floatだが、ここでは整数として扱う)
            if (!isNaN(num) && Number.isSafeInteger(num)) {
                numbers.push(num);
            }
        }
    }

    let pairCount = 0;
    const n = numbers.length;

    // 2つの組 (i, j) を探す (i != j)
    // O(N^2) の探索。Nが敵対的に大きくても、入力の性質（値の範囲）が限定されていれば実用的。
    // 入力行数と値の範囲が与えられていないため、N^2が許容されると仮定する。
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
