/**
 * 標準入力から目標値と整数を受け取り、目標値になる2つの組の個数を数えるプログラム。
 */
function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length < 2) {
        console.log('pairs=0');
        return;
    }

    // 1行目が目標値
    const target = BigInt(input[0].trim());

    // 2行目以降の整数を読み込み、BigIntに変換して格納
    const numbers: BigInt[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            try {
                // 整数として解釈できるか試みる
                const num = BigInt(line);
                numbers.push(num);
            } catch (e) {
                // 整数として解釈できない行は無視する
                continue;
            }
        }
    }

    let pairCount = 0;
    const n = numbers.length;

    // 2個の組 (i, j) で numbers[i] + numbers[j] = target となるものを数える
    // i != j の条件を満たす必要がある。
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
