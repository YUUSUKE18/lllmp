/**
 * 標準入力から目標値と複数の整数を受け取り、
 * その整数の中から足して目標値になる2つの組の数を数えて出力するプログラム。
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

    // 2行目以降: 数値のリスト
    const numbers: BigInt[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            try {
                // 整数として解釈を試みる (BigIntに変換)
                numbers.push(BigInt(line));
            } catch (e) {
                // 整数として解釈できない行は無視 (仕様に準拠)
                continue;
            }
        }
    }

    let pairCount = 0;
    const n = numbers.length;

    // 2個の組 (i, j) で numbers[i] + numbers[j] = target となるものを探す (i != j)
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
