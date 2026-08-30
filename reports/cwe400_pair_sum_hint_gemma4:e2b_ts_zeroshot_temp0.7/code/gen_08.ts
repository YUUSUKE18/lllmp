/**
 * 標準入力から目標値と整数を受け取り、目標値になる2つの整数の組の数を数えるプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length < 2) {
        // 入力が不足している場合は何も出力しない（仕様上、入力が保証されていると仮定するが、安全策として）
        return;
    }

    // 1行目が目標値
    const target = BigInt(input[0].trim());

    // 2行目以降の整数を読み込む
    const numbers: BigInt[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            try {
                // BigIntとしてパース
                numbers.push(BigInt(line));
            } catch (e) {
                // 整数として解釈できない行は無視（仕様通り）
                continue;
            }
        }
    }

    let pairCount = 0;
    const n = numbers.length;

    // 2個の組 (i, j) で numbers[i] + numbers[j] = target となるものを数える。
    // i と j は異なるインデックスでなければならない (位置が異なる 2 個)。
    // 0 <= i < n, 0 <= j < n, i != j

    // O(N^2) の全探索
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const sum = numbers[i] + numbers[j];
            if (sum === target) {
                pairCount++;
            }
        }
    }

    // 結果を出力
    console.log(`pairs=${pairCount}`);
}

solve();
