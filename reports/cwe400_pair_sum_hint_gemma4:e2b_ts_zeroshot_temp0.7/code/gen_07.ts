/**
 * 標準入力から目標値と整数のリストを読み込み、目標値になる2つの整数の組の数を数えるプログラム。
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
            // 整数として解釈できるか試みる
            if (BigInt(line) > 0 || line === '0') { // 0も許容する場合（問題文の制約から負の数は想定されないが念のため）
                numbers.push(BigInt(line));
            }
        }
    }

    let count = 0;
    const n = numbers.length;

    // 2個の組 (i, j) (i != j) を探す
    // i番目の要素とj番目の要素の和が目標値になるかチェックする
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const sum = numbers[i] + numbers[j];
            if (sum === target) {
                count++;
            }
        }
    }

    // 結果の出力
    console.log(`pairs=${count}`);
}

solve();
