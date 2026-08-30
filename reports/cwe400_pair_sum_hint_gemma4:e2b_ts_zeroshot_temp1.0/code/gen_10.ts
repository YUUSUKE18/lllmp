/**
 * 仕様を満たすプログラム
 * 標準入力から目標値と数列を受け取り、目標値になる2つの組の個数を数える。
 */
function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length < 2) {
        console.log('pairs=0');
        return;
    }

    // 1行目: 目標値
    const target = BigInt(input[0].trim());

    // 2行目以降: 数列
    const numbers: BigInt[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            try {
                numbers.push(BigInt(line));
            } catch (e) {
                // 整数として解釈できない行は無視 (仕様通りに処理)
                continue;
            }
        }
    }

    let pairCount = 0;
    const n = numbers.length;

    // 全ての2つの組 (i, j) について i != j を確認する
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const sum = numbers[i] + numbers[j];
            if (sum === target) {
                pairCount++;
            }
        }
    }

    // 結果の出力
    console.log(`pairs=${pairCount}`);
}

solve();
