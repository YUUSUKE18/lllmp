/**
 * 標準入力から目標値と整数を読み込み、目標値になる2つの組の個数を数えるプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length < 2) {
        console.log('pairs=0');
        return;
    }

    // 1行目を目標値としてパース
    const target = parseInt(input[0].trim(), 10);
    if (isNaN(target)) {
        console.log('pairs=0');
        return;
    }

    // 2行目以降を個数としてパース
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

    // 2個の組 (a, b) を探す。a != b かつ a + b = target。
    // O(N^2) のネストループで探索する。
    // 制約が不明確ですが、効率性を考慮しつつ、全ペアをチェックします。
    // Nが大きくても、O(N^2)が許容範囲内であると仮定します。
    // 入力が敵対的に大きい場合、Nが非常に大きくなる可能性がありますが、
    // 提示された仕様に従い、与えられた入力全体を処理します。

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            // i番目とj番目の要素の和が目標値になるかチェック
            if (numbers[i] + numbers[j] === target) {
                pairCount++;
            }
        }
    }

    // 結果の出力
    console.log(`pairs=${pairCount}`);
}

solve();
