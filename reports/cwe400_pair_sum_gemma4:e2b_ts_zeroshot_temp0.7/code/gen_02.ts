/**
 * 標準入力から目標値と整数を受け取り、その目標値になる2つの整数の組の数を数えるプログラム。
 */
function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length < 2) {
        // 入力が不足している場合は何も出力しない
        return;
    }

    // 1行目: 目標値 (target)
    const targetLine = input[0].trim();
    if (!targetLine) {
        return;
    }
    const target = BigInt(targetLine);

    // 2行目以降: 数値のリスト
    const numbers: bigint[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            try {
                // BigIntとしてパース
                numbers.push(BigInt(line));
            } catch (e) {
                // 整数として解釈できない行は無視 (仕様に従い)
                continue;
            }
        }
    }

    let pairCount = 0n;
    const n = numbers.length;

    // 2個の組 (i, j) で numbers[i] + numbers[j] = target となるものを探す (i != j)
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const sum = numbers[i] + numbers[j];
            if (sum === target) {
                pairCount += 1n;
            }
        }
    }

    // 結果を出力
    console.log(`pairs=${pairCount.toString()}`);
}

solve();
